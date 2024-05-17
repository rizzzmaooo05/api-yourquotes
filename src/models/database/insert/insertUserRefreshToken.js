import getClient from "../get/getClient.js"

const insertUserRefreshToken = async (userId, refreshToken) => {
  const client = getClient()
  const response = await client.from('users_refresh_token').insert({
    user_id: userId,
    refresh_token: refreshToken
  })
  return response
}

export default insertUserRefreshToken