import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

import validation from "../libs/validation.js";
import models from "../models/models.js";
import apiResponse from '../libs/apiResponse.js';

const handleLogin = async (req, res) => {
  const { userId, passWord } = req.body

  res.send(userId+passWord) 
}

export default handleLogin
