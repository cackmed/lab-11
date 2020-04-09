require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trips');
const Itinerary = require('../lib/models/Itinerary');

jest.mock('../lib/services/weather.js', () => ({
  getWOEID() {
    return Promise.resolve('12345');
  },
  getWeather() {
    return Promise.resolve({
      min_temp: 5
    });
  }
}));

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
        plannedDate: new Date('2020-04-11'),
        plan: 'See the london eye',
        woeid: '2487956'
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


    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        
        expect(res.body).toContainEqual(JSON.parse(JSON.stringify(trip)));
        
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
      });
  });
  it('creates an itinerary item', () => {
    return request(app)
      .post(`/api/v1/trips/${trip._id}/item`)
      .send({
        tripsId: trip._id,
        plannedDate: new Date('2020-04-11'),
        plan: 'See the london eye',
        woeid: '2487956'
      })
      .then(res => {
        expect(res.body.itinerary).toContainEqual({
          _id: expect.any(String),
          tripsId: expect.any(String),
          plannedDate: '2020-04-11T00:00:00.000Z',
          plan: 'See the london eye',
          woeid: '2487956',
          __v: 0
        });
      });
  });
  it('can delete an itinerary item', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip._id}/item/${itinerary._id}`)
      .then(res => {
        expect(res.body.itinerary).toHaveLength(0);
      });
  });
});

