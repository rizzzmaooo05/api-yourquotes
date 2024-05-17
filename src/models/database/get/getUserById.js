import getClient from "./getClient.js"

const getUserById = async (id) => {
  const client = getClient()
  const response = await client.from('users').select().eq('id', id)
  return response
}

export default getUserById