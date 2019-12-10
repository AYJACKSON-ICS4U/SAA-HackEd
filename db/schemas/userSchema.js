const mongoose = require('mongoose')
const flashsetSchema = require('./flashsetSchema.js')

const userSchema = new mongoose.Schema({
  login:{username: {
    type: String,
    required: [true, 'Username is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  email: {
    type: String,
    required: [false, 'Email is optional']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }},
  sets: [flashsetSchema]
})

module.exports = userSchema