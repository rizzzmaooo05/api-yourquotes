import express from "express";
import bcrypt from "bcrypt";
import "dotenv/config";
import database from "./src/libs/database.js";
import validation from "./src/libs/validation.js";

const app = express();
app.use(express.json());

const db = database();

app.get("/", async (req, res) => {
  res.send("API Running");
});

app.post("/register", async (req, res) => {
  const emptyValidation = validation.isEmpty(req.body.id);
  const lowerCasevalidation = validation.isLowerCase(req.body.id);
  const alphaNumericvalidation = validation.isAlphaNumeric(req.body.id);
  const eightCharMinValidation = validation.isEightCharMin(req.body.pw);
  const existValidation = await validation.isExist(db, req);

  if (emptyValidation) {
    res.status(500).send({
      error: true,
      message: "id tidak boleh kosong!",
    });
  } else if (!lowerCasevalidation) {
    res.status(500).send({
      error: true,
      message: "id hanya boleh menggunakan lower case!",
    });
  } else if (!alphaNumericvalidation) {
    res.status(500).send({
      error: true,
      message: "id hanya boleh menggunakan Alphabet (a-z) dan Numeric (0-9)!",
    });
  } else if (!eightCharMinValidation) {
    res.status(500).send({
      error: true,
      message: "pw minimal 8 karakter!",
    });
  } else if (existValidation) {
    res.status(500).send({
      error: true,
      message: "id telah terdaftar, silahkan login!",
    });
  } else {
    try {
      const id = req.body.id;
      const rawPW = req.body.pw;

      const salt = await bcrypt.genSalt();
      const pw = await bcrypt.hash(rawPW, salt);

      await db.from("users").insert({ id, pw });
      res.status(200).send({
        error: false,
        message: "registrasi berhasil, silahkan login!",
      });
    } catch {
      res.status(500).send({
        error: true,
        message: "registrasi error, silahkan coba lagi!",
      });
    }
  }
});

app.post("/login", async (req, res) => {
  const emptyValidation = validation.isEmpty(req.body.id);
  const existValidation = await validation.isExist(db, req);

  if (emptyValidation) {
    res.status(500).send({
      error: true,
      message: "id tidak boleh kosong!",
    });
  } else if (!existValidation) {
    res.status(500).send({
      error: true,
      message: "id belum terdaftar, silahkan register!",
    });
  } else {
    try {
      const id = req.body.id;
      const rawPW = req.body.pw;
      const hashedPW = (await db.from('users').select('pw').eq('id', id)).data[0].pw

      const isLoginSucces = await bcrypt.compare(rawPW, hashedPW)

      if (isLoginSucces) {
        res
          .status(200)
          .send({
            error: false,
            message: 'login berhasil!'
          })
        } else {
        res
          .status(401)
          .send({
            error: true,
            message: 'pw yang anda masukkan salah!'
          })
      }

      // const pwCompare = await bcrypt.compare(rawPW, )

    

      // await db.from("users").insert({ id, pw });
      // res.status(200).send({
      //   error: false,
      //   message: "registrasi berhasil, silahkan login!",
      // });
    } catch {
      res.status(500).send({
        error: true,
        message: "registrasi error, silahkan coba lagi!",
      });
    }
  }
});

app.listen(3000, () => console.log("server runnn"));
