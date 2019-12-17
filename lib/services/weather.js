const superagent = require('superagent');


const getWOEID = (lat, long) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`)
    .then(res => {
      const location = res.body[0];
      if(!location) return null;
      return location.woeid;
    });
};

const getWeather = (date, woeid) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/${woeid}/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`)
    .then(res => res.body[0]);
};

module.exports = {
  getWeather,
  getWOEID
};
