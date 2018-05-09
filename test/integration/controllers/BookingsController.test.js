var supertest = require('supertest');

describe('BookingsController.create', () => {
  beforeEach(() => {
    // Simple enduser
    Endusers.create({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juanP@hotmail.com',
      password: '12345',
      remainingHours: 3,
      rfid: '37:49:89:5e'
    });
    Rooms.create({
      alias: '33',
      active: true,
      capacity: 10,
      imageUrl: 'someimage',
      inUse: false,
      location: 'Arriba'
    });
  });

  afterEach(() => {
    // Destroy
    Endusers.destroy({});
    Rooms.destroy({});
  });
  describe('Sending request with no user id', () => {
    let data = {
    };
    it('should return "Enduser was undefined" error', (done) => {
      supertest(sails.hooks.http.app)
        .post('/bookings')
        .send(data)
        .expect(400)
        .expect({err: 'No hay variables en el body'}, done);
    });
  });
  describe('Sending request with nonexistent user id', () => {
    it('should return "Enduser was undefined" error', (done) => {
      supertest(sails.hooks.http.app)
        .post('/bookings')
        .send({ enduser: 0, room: 1, startTime: 1, endTime: 1 })
        .expect(400)
        .expect({err: 'No existe ese usuario' }, done);
    });
  });
  describe('Sending request with nonexistent room', () => {
    it('should return "Enduser was undefined" error', (done) => {
      supertest(sails.hooks.http.app)
        .post('/bookings')
        .send({ enduser: 1, room: 0, startTime: 1, endTime: 1 })
        .expect(400)
        .expect({err: 'No existe esa sala' }, done);
    });
  });
  describe('Sending request with nonexistent room', () => {
    it('should return "Enduser was undefined" error', (done) => {
      supertest(sails.hooks.http.app)
        .post('/bookings')
        .send({ enduser: 1, room: 0, startTime: 1, endTime: 1 })
        .expect(400)
        .expect({err: 'No existe esa sala' }, done);
    });
  });
});

describe('BookingsController.delete', () => {
  before(async () => {
    // Create the booking and the user to delete it
    await Rooms.create({
      alias: '33',
      active: true,
      capacity: 10,
      imageUrl: 'someimage',
      inUse: false,
      location: 'Arriba'
    });
    let room = await Rooms.findOne({ alias: '33' });
    await Timeslots.create({
      time: 0,
      day: 0,
      booked: false,
      daysUntil: 0,
      room: room.id
    });
    Endusers.create({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juanP@hotmail.com',
      password: '12345',
      remainingHours: 3,
      rfid: '37:49:89:5e'
    });
  });
  after(async () => {
    Endusers.destroy({});
    await Rooms.destroy({});
    Timeslots.destroy({});
  });
  describe('Sending request with no params', () => {
    it('should return an "Error in id" error', (done) => {
      supertest(sails.hooks.http.app)
        .delete('/bookings/ ')
        .expect(400)
        .expect({err:'Error in id'}, done);
    });
  });
  describe('Sending request with invalid booking no', () => {
    it('should return a "no booking found" error', (done) => {
      supertest(sails.hooks.http.app)
        .delete('/bookings/0')
        .expect(404)
        .expect({err:'No booking found'}, done);
    });
  });
});

describe('BookingsController.getRoom', () => {
  let thisId = 1;
  before(async () => {
    // Create the booking and the user to delete it
    await Rooms.create({
      alias: '33',
      active: true,
      capacity: 10,
      imageUrl: 'someimage',
      inUse: false,
      location: 'Arriba'
    });
    let room = await Rooms.findOne({ alias: '33' });
    let timeslot = await Timeslots.create({
      time: 0,
      day: 0,
      booked: false,
      daysUntil: 0,
      room: room.id
    }).fetch();
    let enduser = await Endusers.create({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juanP@hotmail.com',
      password: '12345',
      remainingHours: 3,
      rfid: '37:49:89:5e'
    }).fetch();
    let booking = Bookings.create({
      enduser: enduser.id,
      timeslot: timeslot.id
    }).fetch();
    thisId = booking.id;
  });
  after(async () => {
    Endusers.destroy({});
    await Rooms.destroy({});
    Timeslots.destroy({});
  });
  describe('Sending request with nonexistent booking id', () => {
    it('Should return "No booking found"', (done) => {
      supertest(sails.hooks.http.app)
        .get('/bookings/0/getRoom')
        .expect(404)
        .expect({err:'No booking found with that id'}, done);
    });
  });
});

