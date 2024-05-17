import getClient from "./getClient.js"

const getUsersPassword = async () => {
  const client = getClient()
  const response = await client.from('users_password').select()
  return response
}

export default getUsersPassword