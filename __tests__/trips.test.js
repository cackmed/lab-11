require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trips');
const Itinerary = require('../lib/models/Itinerary');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let trip;
  let itinerary;
  beforeEach(async() => {
    trip = await Trip.create(
      { location: 'Portland', duration: 5, modeOfTransportation: 'plane' });
    itinerary = await Itinerary.create(
      {
        tripsId: trip._id,
        plannedDate: new Date(),
        plan: 'See the london eye'
      },
    );
  });


  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({ location: 'Portland', duration: 5, modeOfTransportation: 'plane' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Portland',
          duration: 5,
          modeOfTransportation: 'plane',
          __v: 0
        });
      });
  });

  it('gets all trips', async() => {
    const trips = await Trip.create([
      { location: 'Portland', duration: 5, modeOfTransportation: 'plane' },
      { location: 'Ashland', duration: 4, modeOfTransportation: 'car' },
      { location: 'Hokaido', duration: 22, modeOfTransportation: 'boat' }
    ]);

    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        trips.forEach(trip => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(trip)));
        });
      });
  });
  it('gets a trip by id', async() => {
    return request(app)
      .get(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toMatchObject({
          _id: trip._id.toString(),
          location: 'Portland',
          duration: 5,
          modeOfTransportation: 'plane',
          itinerary: JSON.parse(JSON.stringify([itinerary])),
          __v: trip.__v
        });
      });
  });
      
 

  it('updates a trip by id', async() => {
    return request(app)
      .patch(`/api/v1/trips/${trip._id}`)
      .send({ location: 'Brussels' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          location: 'Brussels',
          duration: 5,
          modeOfTransportation: 'plane',
          __v: 0
        });
      });
  });
  it('can delete a trip with DELETE', async() => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip._id.toString(),
          location: trip.location,
          duration: 5,
          modeOfTransportation: 'plane',
          __v: trip.__v
        });

        return Itinerary.find();
      })
      .then(itinerary => {
        expect(itinerary).toHaveLength(0);
      });
  });
});
