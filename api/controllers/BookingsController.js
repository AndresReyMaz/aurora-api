/**
 * BookingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  list: (req, res) => {
    //Bookings.find().populate('room').then(data => res.status(200).json(data)).catch(err => res.status(400).json({error: err}));
    let query = 'SELECT bookings.id AS "idBooking", time, day, alias FROM endusers INNER JOIN bookings ON endusers.id =  bookings.enduser INNER JOIN timeslots ON bookings.timeslot = timeslots.id INNER JOIN rooms ON timeslots.room = rooms.id WHERE enduser = ' + req.query.enduser + ';';
    return sails.getDatastore().sendNativeQuery(query)
      .then(data => {
        // data.rows.forEach(item => {
        //   item.idBooking = item.id;
        // });
        res.status(200).json(data.rows);
      })
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
    // Check that the starting time is later than the current one
    let time1 = await sails.helpers.getStartingTime();
    if (req.body.startTime <= Date.parse(time1)) {
      return res.status(400).send({err: 'Es demasiado tarde para reservar a esta hora. Puede ir a la sala y hacer una reserva directa si esta se encuentra libre.'});
    }
    let endTime = req.body.endTime;
    if (endTime === -1) {
      let thisTime = await sails.helpers.getStartingTime();
      endTime = await (Date.parse(thisTime) + 30 * 60 * 1000);
    }
    sails.log(endTime);
    // Get total time between the two times
    let timeDiff = (parseInt(endTime) - parseInt(req.body.startTime));
    if (timeDiff > enduser.remainingHours * 30 * 60 * 1000) {
      sails.log('Only ' + (enduser.remainingHours * 30 * 60 * 1000) + ' remaining milis');
      return res.send(400, { err: 'User does not have enough remaining hours' } );
    }
    if (timeDiff < 30 * 60 * 1000) {
      return res.send(400, { err: 'Less than one timeslot was selected'} );
    }

    // Check that none of the timeslots in question are booked
    let timeslotArray = await Timeslots.find({
      time: { '>=': req.body.startTime, '<': endTime },
      room: req.body.room
    });
    let filteredArray = await timeslotArray.filter(item => item.booked === 'true');
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
    // If the current starting time is same as r
    // Convert the timeslots' booked to true
    Timeslots.update({
      time: { '>=': req.body.startTime, '<': endTime },
      room: req.body.room
    }).set( { booked: 'true' } )
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
    let currentUser = await Endusers.findOne({ rfid: req.body.idCard }).catch(err => {return res.status(400).send({err:err});});
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
      time: String(Date.parse(time1)),
      room: req.body.idRoom
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in BookingsController.checkCardOutside');
      res.send(400, { error: 'No timeslot found'} );
      return;
    }
    if (currentTimeslot.booked === 'true') {
      sails.log('Room is currently booked');
      // Check that the room's current booking belongs to the person that holds req.body.idCard
      let currentBooking = await Bookings.findOne({ timeslot: currentTimeslot.id }).populate('enduser');
      if (currentBooking === undefined) {
        sails.log('Error with retrieving the currentBooking');
        return;
      }
      if (currentBooking.enduser.rfid !== req.body.idCard) {
        await Rooms.update({ id: record.id }).set({ inUse: true });
        res.send(200, { response: false });
      } else {
        res.send(200, { response: true });
      }
    } else {
      sails.log('Room is empty');
      // Current room is empty. Create a booking for half an hour
      let secs = await sails.helpers.getRemainingSeconds();
      await Rooms.update({ id: record.id }).set({ inUse: true });
      await Timeslots.update({id: currentTimeslot.id }).set({booked: 'true'});
      await Endusers.update({id: currentUser.id}).set({remainingHours: currentUser.remainingHours - 1 });
      await Bookings.create({ enduser: currentUser.id, timeslot: currentTimeslot.id })
        .then(() => {
          res.send(200, { response: true });
          sails.axios.get(sails.config.custom.burrowUrl + '/setTimer?time=' + secs)
            .catch(err => sails.log('axios error: ' + err));
        })
        .catch(err => res.send(400, { error: err }));
    }
    sails.axios.get(sails.config.custom.burrowUrl + '/red')
      .catch(err => res.status(400).send({err: err}));
  },

  // Delivered when user doesn't place id card in slot within 10 secs
  removeBooking: async (req, res) => {
    sails.log('removeBooking called');
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
      await Bookings.destroy({ timeslot: currentTimeslot.id }).then(() => res.send(200, { response: 'ok'} )).catch(err => {return res.send(400, {err:err});});
      await Rooms.update({ id: room.id }).set({ inUse: false }).then(() => {}).catch(err => {return res.send(400, {err:err});});
      sails.axios.get(sails.config.custom.burrowUrl + '/stopAndResetTimer').catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green').catch(err => sails.log('axios error: ' + err));
    } else {
      res.send(400, { response: 'Error: room is not presently booked' });
    }
  },

  // Delivered when user removes card from slot
  rmBooking: async (req, res) => {
    sails.log('rmBooking called');
    if (req.body.idRoom === undefined) {
      sails.log('idRoom was undefined in removeBooking');
      res.send(400, {err: 'No idRoom parameter was set'});
      return;
    }
    let room = await Rooms.findOne({ id: req.body.idRoom }).catch(err => {sails.log('error retrieving room'); return res.status(400).send({err:err});});
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
    }).catch(err => {sails.log('Error retrieving timeslot'); return res.status(400).send({err:err});});
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in BookingsController.removeBooking');
      res.send(400, {err: 'Error retrieving the timeslot'});
      return;
    }
    // CHECK IF USER IS THE OWNER OF THE CURRENT RES
    let enduser = await Endusers.findOne({ rfid: req.body.idCard})
      .catch(err => {sails.log('Error retrieving enduser'); return res.status(400).send({err:err});});
    let booking = await Bookings.findOne({ enduser: enduser.id, timeslot: currentTimeslot.id })
      .catch(err => {sails.log('Error retrieving booking'); return res.status(400).send({err:err});});
    if (booking === undefined) {
      // No matching reservation found. Means the user is not supposed to be there.
      sails.log('Calling stop');
      sails.axios.get(sails.config.custom.burrowUrl + '/stop').catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green').catch(err => sails.log('axios error: ' + err));
      return;
    }
    if (currentTimeslot.booked === 'true') {
      sails.log('Calling stopAndResetTimer');
      // Drop the booking in the database
      await Timeslots.update({ id: currentTimeslot.id }).set({ booked: 'false' }).then(() => {}).catch(err => res.send(400, {err: err}));
      await Bookings.destroy({ timeslot: currentTimeslot.id }).then(() => res.send(200, { response: 'ok'} )).catch(err => res.send(400, {err:err}));
      await Rooms.update({ id: room.id }).set({ inUse: false });
      sails.axios.get(sails.config.custom.burrowUrl + '/stopAndResetTimer').catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green').catch(err => sails.log('axios error: ' + err));
    } else {
      sails.log('currentTimeslot.booked was false');
      res.send(400, { response: 'Error: room is not presently booked' });
    }
  },

  // DELETE a booking (prompted by the user)
  delete: async (req, res) => {
    if (req.params.id === undefined || req.params.id === 'undefined') {
      return res.status(400).send({ err: 'Error in id '});
    }
    // First check if the booking to remove corresponds to the present one
    let time1 = await sails.helpers.getStartingTime();
    let booking = await Bookings.findOne({ id: req.params.id }).populate('timeslot');
    sails.log('Checking on delete');
    sails.log(parseInt(booking.timeslot.time));
    sails.log(Date.parse(time1));
    if (parseInt(booking.timeslot.time) === Date.parse(time1)) {
      return res.status(400).send({ err: 'Es demasiado tarde para eliminar esta reserva.'});
    }

    // Destroy the booking
    let removedBooking = await Bookings.destroy({ id: req.params.id }).fetch();
    sails.log('removedBooking:');
    sails.log(removedBooking);
    if (removedBooking.length !== 1) {
      return res.send(400, {err: 'No booking found with that id'});
    }
    // Update the room's timeslot to not-booked
    let timeslot = await Timeslots.update({ id: removedBooking[0].timeslot }).set({ booked: 'false' }).fetch()
      .then(() => {})
      .catch(err => { return res.send(400, { err: err });});
    // Return half hour to user
    let myUser = await Endusers.findOne({ id: removedBooking[0].enduser });
    if (!myUser) {
      return res.send(400, {err: 'No user found'});
    }
    await Endusers.update({ id: removedBooking[0].enduser }).set({ remainingHours: (myUser.remainingHours + 1) });

    // Maybe set room to inUse false, depending if the starting time is same as current starting time
    if (Date.parse(time1) === timeslot.time) {
      await Rooms.update({ id: timeslot.room }).set({inUse: false});
    }
    return res.send(200, {status: 'ok'});
  },

  getRoom: async(req, res) => {
    let booking = await Bookings.findOne({id: req.params.id}).populate('timeslot');
    if (booking === undefined) {
      return res.status(404).send({err: 'No booking found with that id'});
    }
    await Rooms.findOne({ id: booking.timeslot.room })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(400).send({err: err});
      });
  }
};

