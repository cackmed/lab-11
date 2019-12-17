const getWoeId = require('../services/getwoeId');

module.exports = (req, res, next) => {
  const { long, lat } = req.body;
  getWoeId(long, lat);
  next(); 
};

