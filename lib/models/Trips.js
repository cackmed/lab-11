const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  ModeOfTransportation: {
    type: String,
    required: true,
    enum: ['plane', 'car', 'boat', 'on foot']
  }
});

module.exports = mongoose.model('Trip', schema);

