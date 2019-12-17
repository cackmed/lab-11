const express = require('express');
const Router = express.Router();
const Itinerary = require('../models/Itinerary');
const woeIdMiddleWare = require('../middleware/woeIdMiddleWare');

Router.use(express.json());

Router.post('/api/v1/itinerary', woeIdMiddleWare, (req, res, next) => {
  Itinerary
    .create({ ...req.body, trip: req.params.id, woeid: req.woeid })
    .then(itinerary => res.send(itinerary))
    .catch(next);
});


Router.get('/api/v1/itinerary', (req, res) => {
  Itinerary
    .find()
    .select()
    .then(itinerary => res.send(itinerary));
});

Router.get('/api/v1/itinerary/:id', (req, res) => {
  Itinerary
    .findById(req.params.id)
    .populate('trips')
    .then(itinerary => res.send(itinerary));
});

Router.patch('/api/v1/itinerary/:id', (req, res) => {
  Itinerary
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(itinerary => res.send(itinerary));
});

Router.delete('/api/v1/itinerary/:id', (req, res) => {
  Itinerary
    .findByIdAndDelete(req.params.id)
    .then(itinerary => res.send(itinerary));
});
module.exports = Router;
