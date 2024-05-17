import getClient from "../get/getClient.js"

const insertUserPassword = async (userId, passWord) => {
  const client = getClient()
  const response = await client.from('users_password').insert({
    id_user: userId,
    password: passWord
  })
  return response
}

export default insertUserPassword