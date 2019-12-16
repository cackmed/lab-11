const express = require('express');
const router = express.Router();
const Trip = require('../models/Trips');
const Itinerary = require('../models/Itinerary');

router.use(express.json());

router.post('/api/v1/trips', (req, res) => {
  Trip
    .create(req.body)
    .then(trip => res.send(trip));
});
  
router.get('/api/v1/trips', (req, res) => {
  Trip
    .find()
    .select({ location: true })
    .then(trips => res.send(trips));
});
  
router.get('/api/v1/trips/:id', (req, res) => {
    
  Trip
    .findById(req.params.id)
    .populate('itinerary')
    .then(trips => res.send(trips));
});
  
router.patch('/api/v1/trips/:id', (req, res) => {
  Trip
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(trip => res.send(trip));
});
  
router.delete('/api/v1/trips/:id', (req, res) => {
  Promise.all([
    Trip.findByIdAndDelete(req.params.id), Itinerary.deleteMany({ tripsId: req.params.id })])
    .then(([trip]) => res.send(trip));
});
module.exports = router;
