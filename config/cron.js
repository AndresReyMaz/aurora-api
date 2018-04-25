// Cron jobs

module.exports.cron = {
  startAnnoy: {
    schedule: '37,55 * * * 1-5',
    onTick: async function() {
      sails.log((new Date()) + '-- CRON: startAnnoy');
      // Get all the rooms which are still booked
      let rooms = await Rooms.find({ inUse: true, id: 1 });
      if (rooms === undefined) {
        return;
      }
      if (rooms.length > 0) {
        // Annoy user
        sails.axios.get(sails.config.custom.burrowUrl + '/threeNoises').catch(err => sails.log(err));
      }
      // Check if there are any rooms with soon reservations to call yellow on
      let thisTime = await sails.helpers.getStartingTime();
      let nextTime = new Date(Date.parse(thisTime) + 30 * 60 * 1000);
      let curTimeslot = await Timeslots.findOne({ time: Date.parse(thisTime), room: 1 });
      let nextTimeslot = await Timeslots.findOne({time: Date.parse(nextTime), room: 1});
      let nextBooking = await Bookings.findOne({ timeslot: nextTimeslot.id });
      if (nextBooking !== undefined) {
        let curBooking = await Bookings.findOne({ timeslot: curTimeslot.id });
        if (curBooking === undefined || curBooking.enduser !== nextBooking.enduser) {
          sails.log('Called yellow');
          sails.axios.get(sails.config.custom.burrowUrl + '/yellow').catch(err => sails.log(err));
        }
      }
      
    }
  },
  checkOnTheHour: {
    schedule: '0,30 * * * 1-5',
    onTick: async function() {
      sails.log((new Date()) + '-- CRON: yellow');
      let curTime = await sails.helpers.getStartingTime();
      let rooms = await Timeslots.find({ booked: 'true', time: Date.parse(curTime)}).populate('room');
      // rooms.forEach
      if (rooms === undefined) {
        return;
      }
      if (rooms.length > 0) {
        sails.axios.get(sails.config.custom.burrowUrl + '/yellow').catch(err => sails.log(err));
      }
      // Update the rooms which have no bookings
      // Update all past rooms to have booked = false
      await Timeslots.update({ time: {'<=': Date.parse(curTime) }}).set({ booked: 'true' }).catch(err => sails.log(err));
    },
  },
  midnightJob: {
    schedule: '0 0 * * 2-6',
    onTick: async function() {
      sails.log((new Date()) + '-- CRON: midnightJob');
      // Remove all the timeslots that are on date just concluded
      await Timeslots.destroy({ daysUntil: 0 })
        .catch(err => sails.log('Error destroying timeslots: ' + err));      
      // Update all timeslots to date less than the date
      let query = 'UPDATE timeslots SET "daysUntil" = "daysUntil" - 1;';
      sails.getDatastore().sendNativeQuery(query)
        .catch(err => sails.log('Error updating timeslots: ' + err));
      // Create new timeslots 6 days from now
      let time = await sails.helpers.getStartingTime();
      time.setHours(0, 0, 0, 0);
      sails.log(time);
      time.setHours(7,0);
      sails.log(Date.parse(time));
      time = new Date(Date.parse(time) + 6 * 24 * 60 * 60 * 1000);
      sails.log(Date.parse(time));
      for (var i = 7; i < 20; ++i) {
        time.setHours(i, 0);
        await Timeslots.create({
          time: String(Date.parse(time)),
          day: String(Date.parse(time)),
          booked: false,
          daysUntil: 4,
          room: 1
        }).then(() => {})
          .catch(err => sails.log('Error creating timeslots: ' + err));
        time.setHours(i, 30);
        await Timeslots.create({
          time: String(Date.parse(time)),
          day: String(Date.parse(time)),
          booked: false,
          daysUntil: 4,
          room: 1
        }).then(() => {})
          .catch(err => sails.log('Error creating timeslots: ' + err));
      }
    },
  },
  startupJob: {
    schedule: '0 0 1 12 2', // never happens
    runOnInit: true,
    onTick: async function() {
      // Create all the initial timeslots
      sails.log((new Date()) + '-- CRON: startupJob');
      let time = new Date();
      time.setHours(7,0,0,0);
      
      for (var j = 0; j < 5; ++j) {
        if (time.getDay() === 0) { // Sunday
          time = new Date(Date.parse(time) + 1 * 24 * 60 * 60 * 1000);
        } else if (time.getDay() === 6) { // Saturday
          time = new Date(Date.parse(time) + 2 * 24 * 60 * 60 * 1000);
        }
        for (var i = 7; i < 24; ++i) {
          time.setHours(i, 0);
          await Timeslots.create({
            time: String(Date.parse(time)),
            day: String(Date.parse(time)),
            booked: false,
            daysUntil: j,
            room: 1
          }).then(() => {})
            .catch(err => sails.log('Error creating timeslots: ' + err));
          time.setHours(i, 30);
          await Timeslots.create({
            time: String(Date.parse(time)),
            day: String(Date.parse(time)),
            booked: false,
            daysUntil: j,
            room: 1
          }).then(() => {})
            .catch(err => sails.log('Error creating timeslots: ' + err));
        }
        time.setDate(time.getDate() + 1);
      }

      let curTime = await sails.helpers.getStartingTime();
      await Timeslots.update({ time: {'<=': Date.parse(curTime) - 30 * 60 * 1000 }}).set({ booked: 'true' }).catch(err => sails.log(err));
    }
  }
};

// Every half hour, set booked = true to all bookings that have now concluded.
// Reducir horas del usuario cuando se aparta en caliente
