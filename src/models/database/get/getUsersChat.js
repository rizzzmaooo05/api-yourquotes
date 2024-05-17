import getClient from "./getClient.js"

const getUsersChat = async () => {
  const client = getClient()
  const response = await client.from('users_chat').select()
  return response
}

export default getUsersChat