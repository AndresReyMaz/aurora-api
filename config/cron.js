// Cron jobs

module.exports.cron = {
  startAnnoy: {
    schedule: '25,55 7-19 * * 1-5',
    onTick: async function() {
      sails.log((new Date()) + '-- CRON: startAnnoy');
      // Get all the rooms which are still booked
      let rooms = await Rooms.find({ inUse: true });
      if (rooms === undefined) {
        return;
      }
      if (rooms.length > 0) {
        // Annoy user
        sails.axios.get(sails.custom.burrowUrl + '/annoy').catch(err => sails.log(err));
      }
    }
  }
};
