import jwt from 'jsonwebtoken'
import 'dotenv/config'

const userAuth = (req, res, next) => {
  const authToken = (req.headers.authorization)?.split(' ')[1]
  if (authToken) {
    const accessTokenSecretKey = process.env.JWT_ACCESS_TOKEN_SECRET_KEY;
    try {
      jwt.verify(authToken, accessTokenSecretKey);
      jwt.decode(authToken)
      next();
    }
    
    catch {
      res.send("token salahhh");
    }
  }
  
  else {
    res.send("token diperlukan");
  }
};

export default userAuth