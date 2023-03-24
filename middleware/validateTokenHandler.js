const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const validateToken = asyncHandler(async (req, res, next) => {
  let token
  let authHeader = req.headers.authorization || req.headers.Authorization
  if (authHeader) {
    if (authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1]
    } else {
      token = authHeader
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401)
        throw new Error('User is not authorized')
      }

      req.user = decoded.user;
      next();
    })
  }else{
    res.status(400);
    throw new Error("Validation Error, Token Not Present")
  }
})

module.exports = validateToken
