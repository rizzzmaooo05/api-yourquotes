import apiResponse from "../libs/apiResponse.js"

const handleRoot = (req, res) => {
  const response = apiResponse(
    false,
    'API RUNNING!',
    ''
  )
  res
    .status(200)
    .send(response)
}

export default handleRoot