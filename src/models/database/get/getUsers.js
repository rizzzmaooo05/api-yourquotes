import getClient from "./getClient.js"

const getUsers = async () => {
  const client = getClient()
  const response = await client.from('users').select()
  return response
}

export default getUsers