const mongoose = require('mongoose')

const LeadsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  contacted: {
    type: Boolean,
    required: true
  }
})

module.exports = mongoose.model('leads', LeadsSchema)
