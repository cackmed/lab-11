const mongoose = require('mongoose');
const { getWeather } = require('../services/weather');

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
  },
  woeid: String,
  latitude: Number,
  longitude: Number
});

schema.methods.getWeather = function() {return getWeather(this.woeid)
  .then(weather => ({
    ...this.toJSON(),
    temp: weather && weather.min_temp
  })); 
};


module.exports = mongoose.model('Itinerary', schema);
