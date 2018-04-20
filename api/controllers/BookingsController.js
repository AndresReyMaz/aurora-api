/**
 * BookingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  list: (req, res) => {
    //Bookings.find().populate('room').then(data => res.status(200).json(data)).catch(err => res.status(400).json({error: err}));
    let query = `SELECT * FROM endusers INNER JOIN bookings ON endusers.id =  bookings.enduser 
                  INNER JOIN timeslots ON bookings.timeslot = timeslots.id 
                  INNER JOIN rooms ON timeslots.room = rooms.id WHERE enduser = ` + req.query.enduser + `;`;
    sails.log('Booking query');
    return sails.getDatastore().sendNativeQuery(query)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json({error: err}));
  },

  create: async function(req, res) {
    // First: check that a user with the given id exists
    let record = await Endusers.findOne({ id: req.body.enduser });
    if (record === undefined) {
      sails.log('Record was undefined');
      return res.send(400, { err: 'No user with that id exists'} );
    }
    sails.log(record.enduser);
    Bookings.create({
      enduser: req.body.enduser
    }, (err) => {
      if (err) {
        res.send(400, { err: err } );
      } else {
        res.ok();
      }
    });
  },

  checkCardOutside: async function(req, res) {
    if (req.body.idRoom === undefined || req.body.idCard === undefined) {
      // POST variables not present
      res.send(400, { error: 'one or more parameters missing' } );
      return;
    }
    let currentUser = await Endusers.findOne({ rfid: req.body.idCard });
    if (currentUser === undefined) {
      sails.log('Error: no user found with that rfid.');
      return;
    }
    // Check current status of room
    let record = await Rooms.findOne({ id: req.body.idRoom });
    if (record === undefined) {
      res.send(400, { error: 'idRoom does not exist' });
      return;
    }
    // Get current timeslot, will be used in both cases.
    let time1 = await sails.helpers.getStartingTime();
    sails.log(Date.parse(time1));
    let currentTimeslot = await Timeslots.findOne({
      time: Date.parse(time1),
      room: req.body.idRoom
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in BookingsController.checkCardOutside');
      return;
    }
    if (record.inUse === true) {
      // Check that the room's current booking belongs to the person that holds req.body.idCard
      let currentBooking = await Bookings.findOne({ timeslot: currentTimeslot.id }).populate('enduser');
      if (currentBooking === undefined) {
        sails.log('Error with retrieving the currentBooking');
        return;
      }
      if (currentBooking.enduser.rfid !== req.body.idCard) {
        res.send(200, { response: 'false' });
      } else {
        res.send(200, { response: 'true' });
      }
    } else {
      // Current room is empty. Create a booking for half an hour
      let secs = await sails.helpers.getRemainingSeconds();
      Bookings.create({ enduser: req.body.idCard, timeslot: currentTimeslot.id })
        .then(() => {
          res.send(200, { success: 'User created' });
          sails.axios.get('http://aurora.burrow.io/setTimer?time=' + secs)
            .catch(err => sails.log('axios error: ' + err));
        })
        .err(err => res.send(400, { error: err }));
    }
  },

  removeBooking: async (req, res) => {
    if (req.body.idRoom === undefined) {
      sails.log('idRoom was undefined in removeBooking');
      return;
    }
    let room = Rooms.findOne({ id: req.body.idRoom });
    if (room === undefined) {
      sails.log('idRoom does not match an exisiting room');
      return;
    }
    if (room.inUse === true) {
      // Drop the booking in the database
      let currentTimeslot = await Timeslots.findOne({
        time: this.getStartingTime(),
        room: req.body.idRoom
      });
      if (currentTimeslot === undefined) {
        sails.log('Error retrieving the timeslot in BookingsController.removeBooking');
        return;
      }
      Bookings.destroy({ timeslot: currentTimeslot.id });
      sails.axios.get('http://aurora.burrow.io/red').catch(err => sails.log('axios error: ' + err));
    }
    res.send(200);
  }
};

