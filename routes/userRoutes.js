const express = require('express')
const router = express.Router()
const {
  registerNewUser,
  loginUser,
  currentUserInfo,
} = require('../controllers/userController')
const validateToken = require('../middleware/validateTokenHandler')

router.post('/register', registerNewUser)
router.post('/login', loginUser)
router.get('/current', validateToken, currentUserInfo)

module.exports = router
