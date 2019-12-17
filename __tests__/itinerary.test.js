// require('dotenv').config();

// const request = require('supertest');
// const app = require('../lib/app');
// const connect = require('../lib/utils/connect');
// const mongoose = require('mongoose');
// const Trip = require('../lib/models/Trips');
// const Itinerary = require('../lib/models/Itinerary');

// jest.mock('../lib/services/weather.js', () => ({
//   getWOEID() {
//     return Promise.resolve('12345');
//   },
//   getWeather() {
//     return Promise.resolve({
//       min_temp: 5
//     });
//   }
// }));


// describe('Itinerary routes', () => {
//   beforeAll(() => {
//     connect();
//   });

//   beforeEach(() => {
//     return mongoose.connection.dropDatabase();
//   });

//   let trip;
//   let itinerary;
//   beforeEach(async() => {
//     trip = await Trip.create(
//       { location: 'Portland', duration: 5, modeOfTransportation: 'plane' });
//     itinerary = await Itinerary.create(
//       {
//         tripsId: trip._id,
//         plannedDate: new Date('2020-03-21'),
//         plan: 'See the london eye',
//         woeid: '2487956',
//       },
//     );
//   });

//   afterAll(() => {
//     return mongoose.connection.close();
//   });

//   it('creates an itinerary item', () => {
//     return request(app)
//       .post('/api/v1/itinerary')
//       .send({
//         tripsId: trip._id,
//         plannedDate: Date.now(),
//         plan: 'See the london eye',
//       })
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           tripsId: trip._id.toString(),
//           plannedDate: '2020-03-21T00:00:00.000Z',
//           plan: 'See the london eye',
//           woeid: '2487956',
//           __v: 0
//         });
//       });
//   });

//   it('gets all itinerary items', async() => {
//     const itineraryItems = await Itinerary.create([
//       {
//         tripsId: trip._id,
//         plannedDate: new Date(),
//       },
//       {
//         tripsId: trip._id,
//         plannedDate: new Date(),
//       },
//       {
//         tripsId: trip._id,
//         plannedDate: new Date(),
//       },
//       {
//         tripsId: trip._id,
//         plannedDate: new Date(),
//       },
//     ]);
  

//     return request(app)
//       .get('/api/v1/itinerary')
//       .then(res => {
//         itineraryItems.forEach(itinerary => {
//           expect(res.body).toContainEqual(JSON.parse(JSON.stringify(itinerary)));
//         });
//       });
//   });
//   it('gets a itinerary item by id', async() => {
//     return request(app)
//       .get(`/api/v1/itinerary/${itinerary._id}`)
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           tripsId: trip._id.toString(),
//           plannedDate: '2020-03-21T00:00:00.000Z',
//           plan: 'See the london eye',
//           woeid: '2487956',
//           __v: 0
//         });
//       });
//   });
      
 

//   it('updates a itinerary by id', async() => {
//     return request(app)
//       .patch(`/api/v1/itinerary/${itinerary._id}`)
//       .send({ plan: 'See the royal palace' })
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           tripsId: trip._id.toString(),
//           plannedDate: '2020-03-21T00:00:00.000Z',
//           plan: 'See the royal palace',
//           woeid: '2487956',
//           __v: 0
//         });
//       });
//   });
//   it('can delete a itinerary with DELETE', async() => {
//     return request(app)
//       .delete(`/api/v1/itinerary/${itinerary._id}`)
//       .then(res => {
//         expect(res.body).toEqual({
//           _id: expect.any(String),
//           tripsId: trip._id.toString(),
//           plannedDate: '2020-03-21T00:00:00.000Z',
//           plan: 'See the london eye',
//           woeid: '2487956',
//           __v: 0
//         });
//       });
//   });
// });
