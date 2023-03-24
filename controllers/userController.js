const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require('dotenv').config()

const registerNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error('UserName , Email and Password are mandatory')
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password.toString(), 10)
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      })
      res.status(200).json({
        id: newUser._id,
        username: newUser.username,
      })
    } catch (error) {
      res.status(400)
      throw new Error(error)
    }
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400)
    throw new Error('Username  and Password are mandatory')
  }

  const user = await User.findOne({username})
  if (user && await bcrypt.compare(password.toString(), user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' },
    )

    res.status(200).json({
      accessToken: accessToken,
    })
  } else {
    res.status(401)
    throw new Error('Invalid Username or Password')
  }
})

const currentUserInfo = asyncHandler(async (req, res) => {
  res.status(200).send(req.user)
})

module.exports = {
  registerNewUser,
  loginUser,
  currentUserInfo,
}
