import express from 'express'

import handleRoot from '../controllers/handleRoot.js'
import handleUsers from '../controllers/handleUsers.js'
import handleRegister from '../controllers/handleRegister.js'
import handleLogin from '../controllers/handleLogin.js'
import handleGetNewAccessToken from '../controllers/handleGetNewAccessToken.js'
import handleLogout from '../controllers/handleLogout.js'

// import userAuth from '../middlewares/userAuth.js'

const router = express.Router()

router.get('/', handleRoot)
router.get('/get-new-access-token', handleGetNewAccessToken)
router.get('/users', handleUsers)
router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.delete('/logout', handleLogout)

export default router