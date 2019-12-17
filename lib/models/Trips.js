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
  toJSON: { 
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.id;
    }
  }
});


schema.virtual('itinerary', {
  ref: 'Itinerary',
  localField: '_id',
  foreignField: 'tripsId',
});
schema.statics.findByIdWithWeather = async function(id) {
  const trip = await this
    .findById(id)
    .populate('itinerary');

  const itinerary = await Promise.all(trip.itinerary.map(item => item.getWeather()));

  return {
    ...trip.toJSON(),
    itinerary
  };
};


module.exports = mongoose.model('Trip', schema);

