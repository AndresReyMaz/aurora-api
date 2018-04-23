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
    let enduser = await Endusers.findOne({ id: req.body.enduser });
    if (enduser === undefined) {
      sails.log('Record was undefined');
      return res.send(400, { err: 'No user with that id exists'} );
    }
    // Check that a room with the given id exists
    let room = await Rooms.findOne( { id: req.body.room } );
    if (room === undefined) {
      sails.log('Room was undefined');
      return res.send(400, { err: 'No room with that id exists'} );
    }
    // Get total time between the two times
    let timeDiff = (parseInt(req.body.endTime) - parseInt(req.body.startTime));
    if (timeDiff > enduser.remainingHours * 30 * 60 * 1000) {
      sails.log('Only ' + (enduser.remainingHours * 30 * 60 * 1000) + ' remaining milis');
      return res.send(400, { err: 'User does not have enough remaining hours' } );
    }
    if (timeDiff < 30 * 60 * 1000) {
      return res.send(400, { err: 'Less than one timeslot was selected'} );
    }

    // Check that none of the timeslots in question are booked
    let timeslotArray = await Timeslots.find({
      time: { '>=': req.body.startTime, '<': req.body.endTime },
      room: req.body.room
    });
    let filteredArray = await timeslotArray.filter(item => item.booked === true);
    if (filteredArray.length > 0) {
      return res.send(400, { err: 'At least one of the chosen timeslots is already booked'} );
    }
    timeslotArray.forEach(timeslot => {
      // Create my bookings
      Bookings.create({
        enduser: req.body.enduser,
        timeslot: timeslot.id
      }).then(() => {}).catch(err => {
        sails.log('There was an error creating the bookings');
        return res.send(400, {err:err});
      });
    });
    sails.log(enduser.remainingHours);
    sails.log(timeslotArray.length);
    // Update the user's remainingHours
    Endusers.update({
      id: enduser.id
    })
      .set( { remainingHours: (parseInt(enduser.remainingHours) - parseInt(timeslotArray.length)) })
      .then(() => {})
      .catch(err => { return res.send(400, {err:err}); });

    // Convert the timeslots' booked to true
    Timeslots.update({
      time: { '>=': req.body.startTime, '<': req.body.endTime },
      room: req.body.room
    }).set( { booked: true } )
    .then(() => {res.send(200, { status: 200 });}).catch(err => {
      sails.log('There was an error updating the timeslots');
      return res.send(400, {err:err});
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
      res.send(200, { response: false });
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
      res.send(400, { error: 'No timeslot found'} );
      return;
    }
    if (currentTimeslot.booked === 'true') {
      // Check that the room's current booking belongs to the person that holds req.body.idCard
      let currentBooking = await Bookings.findOne({ timeslot: currentTimeslot.id }).populate('enduser');
      if (currentBooking === undefined) {
        sails.log('Error with retrieving the currentBooking');
        return;
      }
      if (currentBooking.enduser.rfid !== req.body.idCard) {
        res.send(200, { response: false });
      } else {
        res.send(200, { response: true });
      }
    } else {
      // Current room is empty. Create a booking for half an hour
      let secs = await sails.helpers.getRemainingSeconds();
      Bookings.create({ enduser: currentUser.id, timeslot: currentTimeslot.id })
        .then(() => {
          res.send(200, { response: true });
          sails.axios.get('http://aurora.burrow.io/setTimer?time=' + secs)
            .catch(err => sails.log('axios error: ' + err));
        })
        .catch(err => res.send(400, { error: err }));
    }
  },

  // Delivered when user doesn't place id card in slot within 10 secs
  removeBooking: async (req, res) => {
    if (req.body.idRoom === undefined) {
      sails.log('idRoom was undefined in removeBooking');
      res.send(400, {err: 'No idRoom parameter was set'});
      return;
    }
    let room = await Rooms.findOne({ id: req.body.idRoom });
    if (room === undefined) {
      sails.log('idRoom does not match an exisiting room');
      res.send(400, {err: 'No room with that id was found'});
      return;
    }
    let time1 = await sails.helpers.getStartingTime();
    sails.log(Date.parse(time1));
    let currentTimeslot = await Timeslots.findOne({
      time: Date.parse(time1),
      room: req.body.idRoom
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in BookingsController.removeBooking');
      res.send(400, {err: 'Error retrieving the timeslot'});
      return;
    }
    if (currentTimeslot.booked === 'true') {
      // Drop the booking in the database
      await Timeslots.update({ id: currentTimeslot.id }).set({ booked: 'false' }).then(() => {}).catch(err => res.send(400, {err: err}));
      await Bookings.destroy({ timeslot: currentTimeslot.id }).then(() => res.send(200, { response: 'ok'} )).catch(err => res.send(400, {err:err}));
      sails.axios.get('http://aurora.burrow.io/red').catch(err => sails.log('axios error: ' + err));
    } else {
      res.send(400, { response: 'Error: room is not presently booked' });
    }
  },

  // DELETE a booking
  delete: async (req, res) => {
    if (!req.params.id) {
      return res.status(400).send({ err: 'Error in id '});
    }
    // Begin transaction
    await sails.getDatastore()
      .transaction(async (db, proceed) => {
        // Destroy the booking
        let removedBooking = await Bookings.destroy({ id: req.params.id }).usingConnection(db).fetch();
        if (removedBooking.length !== 1) {
          return proceed(new Error('No booking with that id found'));
        }
        // Update the room's timeslot to not-booked
        Timeslots.update({ id: removedBooking[0].timeslot }).set({ booked: 'false' }).usingConnection(db);
        // Return half hour to user
        let myUser = await Endusers.findOne({ id: removedBooking[0].enduser }).usingConnection(db);
        if (!myUser) {
          return proceed(new Error('No user found'));
        }
        Endusers.update({ id: removedBooking[0].enduser }).set({ remainingHours: (myUser.remainingHours - 1) }).usingConnection(db);
        return proceed();
      })
      .intercept((err) => { return res.send(400, {err: err});});
    return res.send(200, {status: 'ok'});
  }
};

