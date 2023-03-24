const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add the Username'],
      unique: [true, 'User Name already exists'],
    },
    email: {
      type: String,
      required: [true, 'Please add the User Email Address'],
      unique: [true, 'Email Address already exists'],
    },
    password: {
      type: String,
      required: [true, 'Please add User Password'],
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('User', userSchema)
