const { getWOEID } = require('../services/weather');

module.exports = (req, res, next) => {
  getWOEID(req.body.lat, req.body.long)
    .then(woeid => {
      req.woeid = woeid;
      next();
    }) 
    .catch(next);

};

