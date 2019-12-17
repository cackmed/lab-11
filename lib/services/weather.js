const superagent = require('superagent');

const getWeather = (woeid) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/`)
    .then(res => {
      const [{ weather_state_name }] = res.body;

      return weather_state_name;
    });
};

module.exports = {
  getWeather
};
