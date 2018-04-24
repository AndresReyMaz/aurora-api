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
    schedule: '0,30, * * * 1-5',
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
    }
  }
};
