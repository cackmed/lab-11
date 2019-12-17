const superagent = require('superagent');

const getWoeId = (location) => {
  return superagent
    .get(`https://www.metaweather.com/api/location/search/?query=${location}`)
    .then(res => {
      const [{ woeid }] = res.body;
      return woeid;
    }
    );
};
module.exports = {
  getWoeId
};
  
