const mongoose = require('mongoose');
const getWeather = require('../../services/weather');

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
  woeId: {
    type: String
  },
  weather: {
    type: String
  }
});

schema.static.Weather = function(id) {
  return this
    .findById(id)
    .then(itinerary => {
      return getWeather(itinerary.woeId);  
    })
    .then(weather_state_name => {
      return this
        .findByIdAndUpdate(id, { weather: weather_state_name }, { new: true });
    });

};



module.exports = mongoose.model('Itinerary', schema);
