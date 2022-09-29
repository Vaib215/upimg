const mongoose = require('mongoose')

const File = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  }
})

mongoose.model('File', File)
module.exports = mongoose.model('File')