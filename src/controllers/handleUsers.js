import models from '../models/models.js'

const handleUsers = async (req, res) => {
  const userData = (await models.getUsers()).data
  res.send(userData)
}

export default handleUsers