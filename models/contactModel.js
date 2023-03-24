const mongoose = require('mongoose')

const contachSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    name: {
      type: String,
      required: [true, 'Please add the contact name'],
    },
    email: {
      type: String,
      required: [true, 'Please add the Email'],
    },
    phone: {
      type: String,
      required: [true, 'Please add the contact Phone Number'],
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Contact', contachSchema)
