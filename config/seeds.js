/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
  endusers: [
    {
      firstName: 'Jorge',
      lastName: 'Beauregard',
      email: 'blurdischarger@hotmail.com',
      hoursRemaining: 30,
      rfid: '13131',
      password: 'asdfasdf'
    },
    {
      firstName: 'Julián Huerta',
      lastName: '😂😂😂',
      email: 'nosep@facebook.com',
      hoursRemaining: 30,
      rfid: '1313',
      password: 'gato'
    }
  ],
  rooms: [
    {
      alias: 'Sala 9',
      capacity: 10,
      active: true,
      imageUrl: 'animage',
      inUse: false,
      location: 'Biblioteca Norte'
    },
    {
      alias: 'Sala 10',
      capacity: 8,
      active: true,
      imageUrl: 'otherimage',
      inUse: false,
      location: 'Biblioteca Sur'
    },
    {
      alias: 'Sala 8',
      capacity: 10,
      active: true,
      imageUrl: 'room.png',
      inUse: false,
      location: 'Biblioteca Sur'
    },
  ],
  timeslots: [
    {
      time: 1522984242,
      day: 1522984242,
      booked: false,
      weeksUntil: 2,
      room: 2,
    },
    {
      time: 1522994242,
      day: 1522994242,
      booked: false,
      weeksUntil: 3,
      room: 3,
    },
    {
      time: 1522994333,
      day: 1522994333,
      booked: false,
      weeksUntil: 3,
      room: 3,
    },
  ],
  bookings: [
    {
      enduser: 2,
      timeslot: 1
    },
    {
      enduser: 1,
      timeslot: 2
    },
    {
      enduser: 2,
      timeslot: 3
    }
  ]
};
