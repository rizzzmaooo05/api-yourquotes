import getClient from "../get/getClient.js"

const insertUser = async (userId, namaDepan, namaBelakang = '') => {
  const client = getClient()
  const response = await client.from('users').insert({
    id: userId,
    nama_depan: namaDepan,
    nama_belakang: namaBelakang,
  })
  return response
}

export default insertUser