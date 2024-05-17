import getClient from "./getClient.js"

const getUsersQuotes = async () => {
  const client = getClient()
  const response = await client.from('users_quotes').select()
  return response
}

export default getUsersQuotes