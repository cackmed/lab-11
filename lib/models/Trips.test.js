const Trip = require('./Trips');

describe('Itinerary model', () => {
  it('has a required tripsId', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    
    expect(errors.location.message).toEqual('Path `location` is required.');
  });

  it('has a required plannedDate', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    
    expect(errors.duration.message).toEqual('Path `duration` is required.');
  });
  
  it('has a required plan', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    
    expect(errors.ModeOfTransportation.message).toEqual('Path `ModeOfTransportation` is required.');
  });
});
