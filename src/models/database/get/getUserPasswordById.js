import getClient from "./getClient.js"

const getUserPasswordById = async (id) => {
  const client = getClient()
  const response = await client.from('users_password').select().eq('id_user', id)
  return response
}

export default getUserPasswordById