import getClient from "./getClient.js"

const getUserRefreshTokenById = async (userId) => {
  const client = getClient()
  const response = await client.from('users_refresh_token').select().eq('user_id', userId)
  return response
}

export default getUserRefreshTokenById