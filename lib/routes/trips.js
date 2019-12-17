const express = require('express');
const router = express.Router();
const Trip = require('../models/Trips');
const Itinerary = require('../models/Itinerary');
const woeidMiddleware = require('../middleware/woeIdMiddleWare');


router.use(express.json());

router.post('/api/v1/trips', (req, res) => {
  Trip
    .create(req.body)
    .then(trip => res.send(trip));
});
  
router.get('/api/v1/trips/:id', (req, res) => {
  Trip
    .findByIdWithWeather(req.params.id)
    .then(trip => res.send(trip));
});
  
router.get('/api/v1/trips', (req, res) => {
    
  Trip
    .find()
    .then(trip => res.send(trip));
});
  
router.patch('/api/v1/trips/:id', (req, res) => {
  Trip
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(trip => res.send(trip));
});
  
router.delete('/api/v1/trips/:id', (req, res, next) => {
  Trip
    .findByIdAndDelete(req.params.id)
    .then(trip => res.send(trip))
    .catch(next);
});

router.post('/api/v1/trips/:id/item', woeidMiddleware, (req, res, next) => {
  Itinerary
    .create({ ...req.body, trip: req.params.id, woeid: req.woeid })
    .then(() => Trip
      .findById(req.params.id)
      .populate('itinerary'))
    .then(trip => res.send(trip))
    .catch(next);
});
router.delete('/api/v1/trips/:id/item/:itineraryId', woeidMiddleware, (req, res) => {
  Itinerary
    .findByIdAndDelete(req.params.itineraryId)
    .then(() => Trip
      .findById(req.params.id)
      .populate('itinerary'))
    .then(trip => res.send(trip));
});


module.exports = router;

