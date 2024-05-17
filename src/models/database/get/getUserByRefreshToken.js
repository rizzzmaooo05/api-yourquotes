import getClient from "./getClient.js"

const getUserByRefreshToken = async (refreshToken) => {
  const client = getClient()
  const response = await client.from('users_refresh_token').select().eq('refresh_token', refreshToken)
  return response
}

export default getUserByRefreshToken