import express from "express";
import compression from "compression";
import cors from 'cors'
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import router from "../src/routes/router.js";

const app = express();
app.use(compression())
app.use(express.json());
app.use(cors())
// app.use(bodyParser.json())
app.use(cookieParser())
app.use(router)
app.listen(9001, () => console.log("server runnn"));

export default app;
