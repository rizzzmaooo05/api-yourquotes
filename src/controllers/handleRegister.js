import models from "../models/models.js";
import validation from "../libs/validation.js";
import apiResponse from '../libs/apiResponse.js'
import bcrypt from 'bcrypt'

const handleRegister = async (req, res) => {
  const {userId, namaDepan, namaBelakang, passWord} = req.body
  
  const idEmptyValidation = validation.isEmpty(userId);
  const idLowerCasevalidation = validation.isLowerCase(userId);
  const idAlphaNumericvalidation = validation.isAlphaNumeric(userId);
  const idExistValidation = await validation.isIDExist(userId);
  const namaDepanEmptyValidation = validation.isEmpty(namaDepan);
  const pwEightCharMinValidation = validation.isEightCharMin(passWord);
  
  if (idEmptyValidation) {
    const response = apiResponse(
      true,
      "ID tidak boleh kosong!",
      ""
    );
    res
      .status(400)
      .send(response);
  }
  
  else if (!idLowerCasevalidation) {
    const response = apiResponse(
      true,
      "ID hanya boleh menggunakan lowercase!",
      ""
    );
    res
      .status(400)
      .send(response);
  }
  
  else if (!idAlphaNumericvalidation) {
    const response = apiResponse(
      true,
      "ID hanya boleh menggunakan alphabet (a-z) dan numeric (0-9)!",
      ""
    );
    res
      .status(400)
      .send(response);
  }
  
  else if (idExistValidation) {
    const response = apiResponse(
      true,
      "ID telah terdaftar, silahkan login!",
      ""
    );
    res
    .status(400)
    .send(response);
  }
  
  else if (namaDepanEmptyValidation) {
    const response = apiResponse(
      true,
      "Nama depan wajib diisi!",
      ""
    );
    res
      .status(400)
      .send(response);
  }
  
  else if (!pwEightCharMinValidation) {
    const response = apiResponse(
      true,
      "Password minimal 8 karakter!",
      ""
    );
    res
      .status(400)
      .send(response);
  }
  
  else {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassWord = await bcrypt.hash(passWord, salt);

      models.insertUser(userId, namaDepan, namaBelakang)
      models.insertUserPassword(userId, hashedPassWord)

      const response = apiResponse(
        false,
        "Registrasi berhasil, silahkan login!",
        ""
      );
      res
        .status(200)
        .send(response);
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

export default handleRegister