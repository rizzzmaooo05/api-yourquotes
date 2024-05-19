import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import validation from "../libs/validation.js";
import models from "../models/models.js";
import apiResponse from '../libs/apiResponse.js';

const handleLogin = async (req, res) => {
  const { userId, passWord } = req.body

  const idEmptyValidation = validation.isEmpty(userId);
  const idExistValidation = await validation.isIDExist(userId);

  if (idEmptyValidation) {
    const response = apiResponse(
      true,
      "id tidak boleh kosong!",
      ''
    )
    res
      .status(400)
      .send(response);
  }
  
  else if (!idExistValidation) {
    const response = apiResponse(
      true,
      "id belum terdaftar, silahkan register!",
      ''
    )
    res
      .status(400)
      .send(response);
  }
  
  else {
    try {
      const hashedPW = (await models.getUserPasswordById(userId)).data[0].password
      const isLoginSucces = await bcrypt.compare(passWord, hashedPW);

      if (isLoginSucces) {
        const userData = (await models.getUserById(userId)).data[0]

        const payLoad = {
          userId: userData.id,
          namaDepan: userData.nama_depan,
          namaBelakang: userData.nama_belakang
        }

        const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY
        const accessToken = jwt.sign(payLoad, accessTokenSecretKey, {expiresIn: 60})

        const refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY
        const refreshToken = jwt.sign(payLoad, refreshTokenSecretKey)
        // models.insertUserRefreshToken(userId, refreshToken)

        const isUserRefreshTokenExist = (await models.getUserRefreshTokenById(userId)).data[0]
        
        if (isUserRefreshTokenExist) {
          models.updateUserRefreshToken(refreshToken, userId)
        }

        else {
          models.insertUserRefreshToken(userId, refreshToken)
        }
        // console.log(isUserRefreshTokenExist)
        const response = apiResponse(
          false,
          "login berhasil!",
          {accessToken}
        )
        res
          .status(200)
          .cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
          })
          .send(response);
      }
      
      else {
        const response = apiResponse(
          true,
          "password salah",
          ''
        )
        res
          .status(400)
          .send(response);
      }
    }
    
    catch {
      const response = apiResponse(
        true,
        "Registrasi gagal, silahkan coba lagi nanti!",
        ""
      );
      res
        .status(500)
        .send(response);
    }
  }
}

export default handleLogin
