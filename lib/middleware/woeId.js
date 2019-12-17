const getWoeId = require('../../services/getwoeId');

module.exports = (req, res, next) => {
  const { location } = req.body;
  getWoeId(location);
  next(); 
};

