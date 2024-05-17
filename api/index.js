import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser'

import router from "../src/routes/router.js";

const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(bodyParser())
app.use(router)
app.listen(9001, () => console.log("server runnn"));

export default app;
