import models from "../models/models.js"
import apiResponse from "../libs/apiResponse.js"

const handleLogout = (req, res) => {
  const { refreshToken } = req.cookies
  if(refreshToken) {
    models.deleteUserRefreshToken(refreshToken)
    
    const response = apiResponse(
      false,
      'Berhasil logout!',
      ''
    )
    res
      .status(200)
      .clearCookie('refreshToken')
      .send(response)
  }

  else {
    const response = apiResponse(
      false,
      'Gagal logout, Anda belum login!',
      ''
    )
    res
      .status(400)
      .send(response)
  }
}

export default handleLogout