import getClient from "../get/getClient.js"

const deleteUserRefreshToken = async (refreshToken) => {
  const client = getClient()
  const response = await client.from('users_refresh_token').delete().eq('refresh_token', refreshToken)
  return response
}

export default deleteUserRefreshToken