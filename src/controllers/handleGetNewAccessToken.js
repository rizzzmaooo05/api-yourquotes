import jwt from 'jsonwebtoken'
import 'dotenv/config'

import apiResponse from '../libs/apiResponse.js'
import models from '../models/models.js'

const handleGetNewAccessToken = async (req, res) => {
  const refreshToken = req?.cookies?.refreshToken
  const refreshTokenDB = (await models.getUserByRefreshToken(refreshToken))?.data[0]?.refresh_token
  const refreshTokenSecretKey = process.env.JWT_REFRESH_TOKEN_SECRET_KEY
  
  try {
    if (refreshToken == refreshTokenDB) {
      const verify = jwt.verify(refreshToken, refreshTokenSecretKey)
  
      const payLoad = {
        userId: verify.userId,
        namaDepan: verify.namaDepan,
        namaBelakang: verify.namaBelakang
      }
      const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY
      const newAccessToken = jwt.sign(payLoad, accessTokenSecretKey, {expiresIn: 60})
  
      const response = apiResponse(
        false,
        'Access Token baru selesai dibuat!',
        {newAccessToken}
      )
      res
        .status(200)
        .send(response)
    }

    else {
      const response = apiResponse(
        true,
        'Access Token baru gagal dibuat, silahkan login ulang!',
        ''
      )
      res
        .status(400)
        .send(response)
    }
  }

  catch {
    const response = apiResponse(
      true,
      'Access Token baru gagal dibuat, silahkan login ulang!',
      ''
    )
    res
      .status(400)
      .send(response)
  }
}

export default handleGetNewAccessToken