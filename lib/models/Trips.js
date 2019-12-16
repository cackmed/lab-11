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
  modeOfTransportation: {
    type: String,
    required: true,
    enum: ['plane', 'car', 'boat', 'on foot']
  }
  
},
{
  id: false,
  toJSON: { virtuals: true }
});


schema.virtual('itinerary', {
  ref: 'Itinerary',
  localField: '_id',
  foreignField: 'tripsId',
  options: {
    limit: 10
  }
  
});

module.exports = mongoose.model('Trip', schema);

