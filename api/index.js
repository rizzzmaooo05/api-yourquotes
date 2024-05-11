import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from 'body-parser'
import "dotenv/config";
import database from "../src/libs/database.js";
import validation from "../src/libs/validation.js";
import apiResponse from "../src/components/apiResponse.js";

const app = express();
const urlEncodedParser = bodyParser.urlencoded({extended: false})

app.use(express.static("public"));
app.use(express.json());

const db = database();

const usersAuthorization = (req, res, next) => {
  const authToken = req.headers.authorization?.split(" ")[1];

  if (authToken) {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
      const jwtDecode = jwt.verify(authToken, secretKey);
      console.log(jwtDecode);
      next();
    } catch {
      res.send("token salahhh");
    }
  } else {
    res.send("token diperlukan");
  }
};

app.get("/", (req, res) => {
  const response = apiResponse(false, "API Running!", [], "");
  res.send(response);
});

app.get("/users", usersAuthorization, async (req, res) => {
  const dbResponse = await db.from("users").select();
  const usersData = dbResponse.data;
  console.log(req.headers.authorization);
  res.status(200).send(usersData);
});

app.post("/register", urlEncodedParser, async (req, res) => {
  const usersDB = await db.from("users");
  const usersPasswordDB = await db.from("users_password");

  try {
    //  VALIDATION ID
    const idEmptyValidation = validation.isEmpty(req.body.id);
    const idLowerCasevalidation = validation.isLowerCase(req.body.id);
    const idAlphaNumericvalidation = validation.isAlphaNumeric(req.body.id);
    const idExistValidation = await validation.isIDExist(usersDB, req);

    if (idEmptyValidation) {
      const response = apiResponse(true, "ID tidak boleh kosong!", [], "");
      res.status(500).send(response);
    } else if (!idLowerCasevalidation) {
      const response = apiResponse(
        true,
        "ID hanya boleh menggunakan lowercase!",
        [],
        ""
      );
      res.status(500).send(response);
    } else if (!idAlphaNumericvalidation) {
      const response = apiResponse(
        true,
        "ID hanya boleh menggunakan alphabet (a-z) dan numeric (0-9)!",
        [],
        ""
      );
      res.status(500).send(response);
    } else if (idExistValidation) {
      const response = apiResponse(
        true,
        "ID telah terdaftar, silahkan login!",
        [],
        ""
      );
      res.status(500).send(response);
    }

    // VALIDATION NAMA DEPAN
    const namaDepanEmptyValidation = validation.isEmpty(req.body.nama_depan);

    if (namaDepanEmptyValidation) {
      const response = apiResponse(true, "Nama depan wajib diisi!", [], "");
      res.status(500).send(response);
    }

    // VALIDATION PASSWORD

    const eightCharMinValidation = validation.isEightCharMin(req.body.pw);

    if (!eightCharMinValidation) {
      const response = apiResponse(
        true,
        "Password minimal 8 karakter!",
        [],
        ""
      );
      res.status(500).send(response);
    }

    // INSERT DATA TO DATABASE

    // ID, NAMA DEPAN, NAMA BELAKANG
    await usersDB.insert({
      id: req.body.id,
      nama_depan: req.body.nama_depan,
      nama_belakang: req.body.nama_belakang,
    });

    // PASSWORD

    const salt = await bcrypt.genSalt();
    const pw = await bcrypt.hash(req.body.pw, salt);

    await usersPasswordDB.insert({
      id_user: req.body.id,
      password: pw,
    });

    const response = apiResponse(
      false,
      "Registrasi berhasil, silahkan login!",
      [],
      ""
    );
    res.status(200).send(response);
  } catch {
    const response = apiResponse(
      true,
      "Registrasi gagal, silahkan coba lagi nanti!",
      [],
      ""
    );
    res.status(500).send(response);
  }
});

app.post("/login", async (req, res) => {
  const emptyValidation = validation.isEmpty(req.body.id);
  const existValidation = await validation.isExist(db, req);

  if (emptyValidation) {
    res.status(200).send({
      error: true,
      message: "id tidak boleh kosong!",
    });
  } else if (!existValidation) {
    res.status(200).send({
      error: true,
      message: "id belum terdaftar, silahkan register!",
    });
  } else {
    try {
      const id = req.body.id;
      const rawPW = req.body.pw;
      const hashedPW = (await db.from("users").select("pw").eq("id", id))
        .data[0].pw;

      const isLoginSucces = await bcrypt.compare(rawPW, hashedPW);

      if (isLoginSucces) {
        const payLoad = {
          error: false,
          message: "login berhasil!",
        };
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiresIn = 30;

        const token = jwt.sign(payLoad, secretKey, { expiresIn });

        res.status(200).send({
          payLoad,
          token,
        });
      } else {
        res.status(200).send({
          error: true,
          message: "pw yang anda masukkan salah!",
        });
      }
    } catch {
      res.status(500).send({
        error: true,
        message: "registrasi error, silahkan coba lagi!",
      });
    }
  }
});

app.listen(9001, () => console.log("server runnn"));

export default app;
