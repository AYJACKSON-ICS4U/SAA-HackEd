const mongoose = require('mongoose')

const flashcardSchema = new mongoose.Schema({
  back: {
    type: String,
    required: [true, 'Back is required']
  },
 front: {
    type: String,
    required: [false, 'Front is reqired']
  },
  set: {
    type: String,
    required: [true, 'SetID is required']
  },
  owner: {
    type: String,
    required: [true, 'OwnerID is required']
  },
})

module.exports = flashcardSchema