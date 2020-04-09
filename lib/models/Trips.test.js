const Trip = require('./Trips');

describe('Trips model', () => {
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
  
  it('has a required modeOfTransportation', () => {
    const trip = new Trip();
    const { errors } = trip.validateSync();
    
    expect(errors.modeOfTransportation.message).toEqual('Path `modeOfTransportation` is required.');
  });
});
