require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trips');
const Itinerary = require('../lib/models/Itinerary');

describe('Itinerary routes', () => {
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

  it('creates an itinerary item', () => {
    return request(app)
      .post('/api/v1/itinerary')
      .send({
        tripsId: trip._id,
        plannedDate: Date.now(),
        plan: 'See the london eye',
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripsId: trip._id.toString(),
          plannedDate: expect.any(String),
          plan: 'See the london eye',
          __v: 0
        });
      });
  });

  it('gets all itinerary items', async() => {
    const itineraryItems = await Itinerary.create([
      {
        tripsId: trip._id,
        plannedDate: new Date(),
        plan: 'See the london eye'
      },
      {
        tripsId: trip._id,
        plannedDate: new Date(),
        plan: 'Take a picture of Big Ben'
      },
      {
        tripsId: trip._id,
        plannedDate: new Date(),
        plan: 'Mess with Locals'
      },
      {
        tripsId: trip._id,
        plannedDate: new Date(),
        plan: 'Get a drink'
      },
    ]);
  

    return request(app)
      .get('/api/v1/itinerary')
      .then(res => {
        itineraryItems.forEach(itinerary => {
          expect(res.body).toContainEqual(JSON.parse(JSON.stringify(itinerary)));
        });
      });
  });
  it('gets a itinerary item by id', async() => {
    return request(app)
      .get(`/api/v1/itinerary/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          plannedDate: expect.any(String),
          plan: 'See the london eye',
          __v: 0
        });
      });
  });
      
 

  it('updates a itinerary by id', async() => {
    return request(app)
      .patch(`/api/v1/itinerary/${itinerary._id}`)
      .send({ plan: 'See the royal palace' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          plannedDate: expect.any(String),
          plan: 'See the royal palace',
          __v: 0
        });
      });
  });
  it('can delete a itinerary with DELETE', async() => {
    return request(app)
      .delete(`/api/v1/itinerary/${itinerary._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          tripId: trip._id.toString(),
          plannedDate: expect.any(String),
          plan: 'See the london eye',
          __v: 0
        });
      });
  });
});
