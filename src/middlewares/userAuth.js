import jwt from 'jsonwebtoken'
import 'dotenv/config'

import apiResponse from '../libs/apiResponse.js';

const userAuth = (req, res, next) => {
  const authToken = (req.headers.authorization)?.split(' ')[1]
  if (authToken) {
    const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    try {
      jwt.verify(authToken, accessTokenSecretKey);
      next();
    }
    
    catch {
      const response = apiResponse(
        true,
        'Access Token salah atau sudah tidak berlaku!',
        ''
      )
      res
        .status(400)
        .send(response)
    }
  }
  
  else {
    const response = apiResponse(
      true,
      'Access Token diperlukan!',
      ''
    )
    res
      .status(401)
      .send(response)
  }
};

export default userAuth