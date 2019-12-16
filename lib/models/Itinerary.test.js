const Itinerary = require('./Itinerary');

describe('Itinerary model', () => {
  it('has a required tripsId', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.tripsId.message).toEqual('Path `tripsId` is required.');
  });

  it('has a required plannedDate', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.plannedDate.message).toEqual('Path `plannedDate` is required.');
  });
  
  it('has a required plan', () => {
    const itinerary = new Itinerary();
    const { errors } = itinerary.validateSync();
    
    expect(errors.plan.message).toEqual('Path `plan` is required.');
  });
});
