const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  tripsId: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  plannedDate: {
    type: Date,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Itinerary', schema);
