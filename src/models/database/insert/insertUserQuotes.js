import getClient from "../get/getClient.js"

const insertUserQuotes = async (userId, passWord) => {
  const client = getClient()
  const response = await client.from('users_quotes').insert({
    id: userId,
    password: passWord
  })
  return response
}

export default insertUserQuotes