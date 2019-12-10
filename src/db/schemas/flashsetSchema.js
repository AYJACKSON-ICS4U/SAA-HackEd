const mongoose = require('mongoose')
const flashcardSchema = require('./flashcardSchema.js')

const flashsetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  decription: String,
  cards: [flashcardSchema],
  owner: {
    type: String,
    required: [true, 'OwnerID date is required']
  }
})

module.exports = flashsetSchema