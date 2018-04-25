// Cron jobs

module.exports.cron = {
  startAnnoy: {
    schedule: '25,55 * * * 1-5',
    onTick: async function() {
      sails.log((new Date()) + '-- CRON: startAnnoy');
      // Get all the rooms which are still booked
      let rooms = await Rooms.find({ inUse: true });
      if (rooms === undefined) {
        return;
      }
      if (rooms.length > 0) {
        // Annoy user
        sails.axios.get(sails.config.custom.burrowUrl + '/annoy').catch(err => sails.log(err));
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
      //rooms.forEach()
    }
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
      time = new Date(Date.parse(time) + 6 * 24 * 60 * 60 * 1000);
      for (var i = 7; i < 20; ++i) {
        await Timeslots.create({
          time: String(Date.parse(time.setHours(i, 0))),
          day: String(Date.parse(time.setHours(i, 0))),
          booked: false,
          daysUntil: 4,
          room: 1
        }).then(() => {})
          .catch(err => sails.log('Error creating timeslots: ' + err));
        await Timeslots.create({
          time: String(Date.parse(time.setHours(i, 30))),
          day: String(Date.parse(time.setHours(i, 30))),
          booked: false,
          daysUntil: 4,
          room: 1
        }).then(() => {})
          .catch(err => sails.log('Error creating timeslots: ' + err));
      }
    },
    runOnInit: true
  }
};

// Every half hour, set booked = true to all bookings that have now concluded.
// Reducir horas del usuario cuando se aparta en caliente
