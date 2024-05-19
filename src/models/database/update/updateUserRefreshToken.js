import getClient from "../get/getClient.js"

const updateUserRefreshToken = async (refreshToken, userId) => {
  const client = getClient()
  const response = await client.from('users_refresh_token').update({refresh_token: refreshToken}).eq('user_id', userId)
  return response
}

export default updateUserRefreshToken