import deleteUserRefreshToken from './database/delete/deleteUserRefreshToken.js'

import getUsers from './database/get/getUsers.js'
import getUsersPassword from './database/get/getUsersPassword.js'
import getUsersChat from './database/get/getUsersChat.js'
import getUsersQuotes from './database/get/getUsersQuotes.js'
import getUserById from './database/get/getUserById.js'
import getUserPasswordById from './database/get/getUserPasswordById.js'
import getUserByRefreshToken from './database/get/getUserByRefreshToken.js'

import insertUser from './database/insert/insertUser.js'
import insertUserPassword from './database/insert/insertUserPassword.js'
import insertUserRefreshToken from './database/insert/insertUserRefreshToken.js'

const models = {
  deleteUserRefreshToken,
  
  getUsers,
  getUsersChat,
  getUsersPassword,
  getUsersQuotes,
  getUserById,
  getUserPasswordById,
  getUserByRefreshToken,
  
  insertUser,
  insertUserPassword,
  insertUserRefreshToken
}

export default models