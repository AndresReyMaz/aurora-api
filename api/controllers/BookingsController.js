/**
 * BookingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  /**
   * Lists the bookings available that belong to the enduser.
   * @arg {Object} req - Should hold the enduser's id in .query.enduser
   */
  list: (req, res) => {
    let query = 'SELECT bookings.id AS "idBooking", time, day, alias \
      FROM endusers INNER JOIN bookings ON endusers.id = bookings.enduser \
      INNER JOIN timeslots ON bookings.timeslot = timeslots.id \
      INNER JOIN rooms ON timeslots.room = rooms.id \
      WHERE enduser = ' + req.query.enduser + ';';
    return sails.getDatastore().sendNativeQuery(query)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json({error: err}));
  },

  /**
   * Creates a booking for the respective enduser in a given room. Corresponds
   * to POST /bookings
   * @arg {Object} req - Should hold .body.enduser (enduser id), .body.room
   * (room id), body.startTime, and body.endTime (start time and end time of
   * desired reservation in unix miliseconds)
   */
  create: async function(req, res) {
    // First: check that a user with the given id exists
    let enduser = await Endusers.findOne({ id: req.body.enduser });
    if (enduser === undefined) {
      sails.log('Enduser was undefined');
      res.status(400).send({ err: 'No existe ese usuario' });
      return;
    }
    // Check that a room with the given id exists
    let room = await Rooms.findOne({ id: req.body.room });
    if (room === undefined) {
      sails.log('Room was undefined');
      res.status(400).send({ err: 'No existe esa sala' });
      return;
    }
    // Check that the starting time is later than the current one
    let time1 = await sails.helpers.getStartingTime();
    if (req.body.startTime <= Date.parse(time1)) {
      sails.log('Intended reservation is too late');
      res.status(400).send({
        err: 'Es demasiado tarde para reservar a esta hora. Puede ir a la sala \
        y hacer una reserva directa si esta se encuentra libre.'
      });
      return;
    }
    let endTime = req.body.endTime;
    if (endTime === -1) { // If the end time is the last time of the day
      let thisTime = await sails.helpers.getStartingTime();
      // 'Create' the end time by adding 30 minutes to start time
      endTime = await (Date.parse(thisTime) + 30 * 60 * 1000);
    }
    // Get total time between the two times
    let timeDiff = (parseInt(endTime) - parseInt(req.body.startTime));
    // Check if the total time in petition is more than user can reserve
    if (timeDiff > enduser.remainingHours * 30 * 60 * 1000) {
      sails.log('Only ' + (enduser.remainingHours * 30 * 60 * 1000)
        + ' remaining milis');
      res.status(400).send({ err: 'Ya no te quedan horas disponibles' });
      return;
    }
    if (timeDiff < 30 * 60 * 1000) {
      res.status(400).send({ err: 'Eligiste menos de media hora' });
      return;
    }
    // Check that none of the timeslots in petition are already booked
    let timeslotArray = await Timeslots.find({
      time: { '>=': req.body.startTime, '<': endTime },
      room: req.body.room
    });
    let filteredArray = await timeslotArray
                                .filter(item => item.booked === 'true');
    if (filteredArray.length > 0) {
      res.status(400).send({ err: 'Al menos un horario no está libre' });
      return;
    }
    timeslotArray.forEach(timeslot => {
      // Create my bookings
      Bookings.create({
        enduser: req.body.enduser,
        timeslot: timeslot.id
      }).then(() => {})
        .catch(err => {
          sails.log('There was an error creating the bookings');
          res.status(400).send({
            err: 'Ocurrió un error al crear horarios. Contacta al \
                  administrador',
            errInfo: err
          });
          return;
        });
    });
    // Update the user's remainingHours
    Endusers.update({
      id: enduser.id
    })
      .set({ remainingHours: (parseInt(enduser.remainingHours)
                              - parseInt(timeslotArray.length)) })
      .then(() => {})
      .catch(err => {
        res.status(400).send({
          err: 'Ocurrió un error. Contacta al administrador.',
          errInfo: err
        });
        return;
      });
    // If the current starting time is same as r
    // Book the timeslots that user selected
    Timeslots.update({
      time: { '>=': req.body.startTime, '<': endTime },
      room: req.body.room
    }).set({ booked: 'true' })
      .then(() => res.status(200).send({ status: 200 }))
      .catch(err => {
        sails.log('There was an error updating the timeslots');
        res.status(400).send({
          err: 'Ocurrió un error. Contacta al administrador.',
          errInfo: err
        });
        return;
      });
  },

  /**
   * Called by Arduino when a card is run through the sensor
   * @arg {Object} req - .body.idRoom and .body.idCard (the RFID of the card)
   */
  checkCardOutside: async function(req, res) {
    if (req.body.idRoom === undefined || req.body.idCard === undefined) {
      // POST variables not present
      res.status(400).send({ err: 'one or more parameters missing' });
      return;
    }
    let currentUser = await Endusers.findOne({ rfid: req.body.idCard })
                                    .catch(err => {
                                      res.status(400).send({ err: err });
                                      return;
                                    });
    if (currentUser === undefined) {
      sails.log('Error: no user found with that rfid.');
      res.status(200).send({ response: false });
      return;
    }
    // Check current status of room
    let record = await Rooms.findOne({ id: req.body.idRoom });
    if (record === undefined) {
      res.status(400).send({ err: 'idRoom does not exist' });
      return;
    }
    // Get current timeslot, will be used in both cases.
    let time1 = await sails.helpers.getStartingTime();
    let currentTimeslot = await Timeslots.findOne({
      time: String(Date.parse(time1)),
      room: req.body.idRoom
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in checkCardOutside');
      res.status(400).send({ err: 'No timeslot found' });
      return;
    }
    if (currentTimeslot.booked === 'true') {
      sails.log('Room is currently booked');
      // Check that the room's current booking belongs to the person that
      // holds req.body.idCard
      let currentBooking = await Bookings
                                  .findOne({ timeslot: currentTimeslot.id })
                                  .populate('enduser');
      if (currentBooking === undefined) {
        sails.log('Error with retrieving the currentBooking');
        res.status(400).send({ err: 'Error retrieving current booking' });
        return;
      }
      // Check whether the booking's id matches the one that was swiped
      if (currentBooking.enduser.rfid !== req.body.idCard) {
        // Reject user
        await Rooms.update({ id: record.id }).set({ inUse: true });
        res.status(200).send({ response: false });
      } else {
        // Accept user
        res.status(200).send({ response: true });
      }
    } else {
      sails.log('Room is empty');
      // Current room is empty. Create a booking for half an hour
      let secs = await sails.helpers.getRemainingSeconds();
      await Rooms.update({ id: record.id }).set({ inUse: true });
      await Timeslots.update( {id: currentTimeslot.id })
                     .set({ booked: 'true' });
      await Endusers.update({ id: currentUser.id })
                    .set({ remainingHours: currentUser.remainingHours - 1 });
      await Bookings.create({
        enduser: currentUser.id,
        timeslot: currentTimeslot.id
      }).then(() => {
        res.send(200, { response: true });
        sails.axios.get(sails.config.custom.burrowUrl + '/setTimer?time='
                                                                        + secs)
                   .catch(err => sails.log('axios error: ' + err));
      })
        .catch(err => res.status(400).send({ err: err }));
    }
    sails.axios.get(sails.config.custom.burrowUrl + '/red')
               .catch(err => res.status(400).send({ err: err }));
  },

  /**
   * Called when user doesn't place id card in slot within 10 secs
   * @arg {Object} req - holds .body.idRoom
   */
  removeBooking: async (req, res) => {
    sails.log('removeBooking called');
    if (req.body.idRoom === undefined) {
      sails.log('idRoom was undefined in removeBooking');
      res.status(400).send({ err: 'No idRoom parameter was set' });
      return;
    }
    let room = await Rooms.findOne({ id: req.body.idRoom });
    if (room === undefined) {
      sails.log('idRoom does not match an exisiting room');
      res.status(400).send({ err: 'No room with that id was found' });
      return;
    }
    let time1 = await sails.helpers.getStartingTime();
    let currentTimeslot = await Timeslots.findOne({
      time: Date.parse(time1),
      room: req.body.idRoom
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in removeBooking');
      res.status(400).send({ err: 'Error retrieving the timeslot' });
      return;
    }
    if (currentTimeslot.booked === 'true') {
      // Drop the booking in the database, update timeslot and free room
      await Timeslots.update({ id: currentTimeslot.id })
                     .set({ booked: 'false' })
                     .catch(err => res.status(400).send({ err: err }));
      await Rooms.update({ id: room.id })
                 .set({ inUse: false })
                 .catch(err => {
                   res.status(400).send({ err: err });
                   return;
                 });
      await Bookings.destroy({ timeslot: currentTimeslot.id })
                    .then(() => res.status(200).send({ response: 'ok' }))
                    .catch(err => {
                      res.send(400).send({ err: err });
                      return;
                    });
      sails.axios.get(sails.config.custom.burrowUrl + '/stopAndResetTimer')
                 .catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green')
                 .catch(err => sails.log('axios error: ' + err));
    } else {
      res.status(400).send({ response: 'Error: room is not presently booked' });
    }
  },

  /**
   * Called when user removes card from slot
   * @arg {Object} req - holds .body.idRoom
   */
  rmBooking: async (req, res) => {
    sails.log('rmBooking called');
    if (req.body.idRoom === undefined) {
      sails.log('idRoom was undefined in removeBooking');
      res.send(400, {err: 'No idRoom parameter was set'});
      return;
    }
    let room = await Rooms.findOne({ id: req.body.idRoom })
                          .catch(err => {
                            sails.log('error retrieving room');
                            res.status(400).send({ err: err });
                            return;
                          });
    if (room === undefined) {
      sails.log('idRoom does not match an exisiting room');
      res.status(400).send({ err: 'No room with that id was found' });
      return;
    }
    let time1 = await sails.helpers.getStartingTime();
    let currentTimeslot = await Timeslots.findOne({
      time: Date.parse(time1),
      room: req.body.idRoom
    }).catch(err => {
      sails.log('Error retrieving timeslot');
      res.status(400).send({ err: err });
      return;
    });
    if (currentTimeslot === undefined) {
      sails.log('Error retrieving the timeslot in rmBooking');
      res.send(400).status({ err: 'Error retrieving the timeslot' });
      return;
    }
    // CHECK IF USER IS THE OWNER OF THE CURRENT RES
    let enduser = await Endusers.findOne({ rfid: req.body.idCard })
                                .catch(err => {
                                  sails.log('Error retrieving enduser');
                                  res.status(400).send({ err: err });
                                  return;
                                });
    let booking = await Bookings.findOne({
      enduser: enduser.id,
      timeslot: currentTimeslot.id
    }).catch(err => {
      sails.log('Error retrieving booking');
      res.status(400).send({err:err});
      return;
    });
    if (booking === undefined) {
      // No matching reservation found, so user is not supposed to be there.
      sails.log('Calling stop');
      sails.axios.get(sails.config.custom.burrowUrl + '/stop')
                 .catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green')
                 .catch(err => sails.log('axios error: ' + err));
      return;
    }
    if (currentTimeslot.booked === 'true') {
      sails.log('Calling stopAndResetTimer');
      // Drop the booking in the database
      await Timeslots.update({ id: currentTimeslot.id })
                     .set({ booked: 'false' })
                     .catch(err => res.status(400).send({ err: err }));
      await Bookings.destroy({ timeslot: currentTimeslot.id })
                    .then(() => res.status(200).send({ response: 'ok' }))
                    .catch(err => res.status(400).send({ err: err }));
      await Rooms.update({ id: room.id }).set({ inUse: false })
                 .catch(err => res.status(400).send({ err: err }));
      sails.axios.get(sails.config.custom.burrowUrl + '/stopAndResetTimer')
                 .catch(err => sails.log('axios error: ' + err));
      sails.axios.get(sails.config.custom.burrowUrl + '/green')
                 .catch(err => sails.log('axios error: ' + err));
    } else {
      sails.log('currentTimeslot.booked was false');
      res.status(400).send({ response: 'Error: room is not presently booked' });
    }
  },

  /**
   * DELETE a booking (prompted by the user)
   * @arg {Object} req - holds .params.id (the id of the booking)
   */
  delete: async (req, res) => {
    if (req.params.id === undefined || req.params.id === 'undefined') {
      res.status(400).send({ err: 'Error in id' });
      return;
    }
    // First check if the booking to remove corresponds to the present one
    let time1 = await sails.helpers.getStartingTime();
    let booking = await Bookings.findOne({ id: req.params.id })
                                .populate('timeslot');
    if (parseInt(booking.timeslot.time) === Date.parse(time1)) {
      res.status(400).send({
        err: 'Es demasiado tarde para eliminar esta reserva.'
      });
      return;
    }

    // Destroy the booking
    let removedBooking = await Bookings.destroy({ id: req.params.id }).fetch();
    if (removedBooking.length !== 1) {
      res.status(400).send({ err: 'No se encontró tal reserva' });
      return;
    }
    // Update the room's timeslot to not-booked
    let timeslot = await Timeslots.update({ id: removedBooking[0].timeslot })
                                  .set({ booked: 'false' })
                                  .fetch()
                                  .catch(err => {
                                    res.status(400).send({ err: err });
                                    return;
                                  });

    let timeslot2 = await Timeslots.findOne({
      id: parseInt(removedBooking[0].timeslot)
    });
    // Return half hour to user
    let myUser = await Endusers.findOne({ id: removedBooking[0].enduser });
    if (myUser === undefined) {
      res.status(400).send({err: 'No user found' });
      return;
    }
    await Endusers.update({ id: removedBooking[0].enduser })
                  .set({ remainingHours: (myUser.remainingHours + 1) });

    // Maybe set room to inUse false, depending if the starting time is same as
    // current starting time
    if (Date.parse(time1) === timeslot2.time) {
      await Rooms.update({ id: timeslot.room }).set({ inUse: false });
    }
    res.status(200).send({ status: 'ok' });
  },

  /**
   * Returns the information pertaining to the room, given a certain booking
   * @arg {Object} req - holds .params.id, the id of the booking
   */
  getRoom: async(req, res) => {
    let booking = await Bookings.findOne({ id: req.params.id })
                                .populate('timeslot');
    if (booking === undefined) {
      res.status(404).send({ err: 'No booking found with that id' });
      return;
    }
    await Rooms.findOne({ id: booking.timeslot.room })
               .then((data) => {
                 res.status(200).json(data);
               })
               .catch(err => {
                 res.status(400).send({ err: err });
               });
  }
};

