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
      firstName: 'Julián',
      lastName: 'Huerta',
      email: 'nosep@facebook.com',
      hoursRemaining: 30,
      rfid: '1313',
      password: 'gato'
    }
  ],
  rooms: [
    {
      alias: 9,
      capacity: 10,
      active: true,
      imageUrl: 'animage',
      inUse: false,
      location: 'Biblioteca Norte'
    },
    {
      alias: 10,
      capacity: 8,
      active: true,
      imageUrl: 'otherimage',
      inUse: false,
      location: 'Biblioteca Sur'
    },
    {
      alias: 8,
      capacity: 10,
      active: true,
      imageUrl: 'room.png',
      inUse: false,
      location: 'Biblioteca Sur'
    },
  ],
  timeslots: [
    {
      time: '1524571200000',
      day: '1524571200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524573000000',
      day: '1524573000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524574800000',
      day: '1524574800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524576600000',
      day: '1524576600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524578400000',
      day: '1524578400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524580200000',
      day: '1524580200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524582000000',
      day: '1524582000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524583800000',
      day: '1524583800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524585600000',
      day: '1524585600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524587400000',
      day: '1524587400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524589200000',
      day: '1524589200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524591000000',
      day: '1524591000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524592800000',
      day: '1524592800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524594600000',
      day: '1524594600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524596400000',
      day: '1524596400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524598200000',
      day: '1524598200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524600000000',
      day: '1524600000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524601800000',
      day: '1524601800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524603600000',
      day: '1524603600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524605400000',
      day: '1524605400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524607200000',
      day: '1524607200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524609000000',
      day: '1524609000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524610800000',
      day: '1524610800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524612600000',
      day: '1524612600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524614400000',
      day: '1524614400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524616200000',
      day: '1524616200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524657600000',
      day: '1524657600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524659400000',
      day: '1524659400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524661200000',
      day: '1524661200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524663000000',
      day: '1524663000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524664800000',
      day: '1524664800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524666600000',
      day: '1524666600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524668400000',
      day: '1524668400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524670200000',
      day: '1524670200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524672000000',
      day: '1524672000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524673800000',
      day: '1524673800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524675600000',
      day: '1524675600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524677400000',
      day: '1524677400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524679200000',
      day: '1524679200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524681000000',
      day: '1524681000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524682800000',
      day: '1524682800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524684600000',
      day: '1524684600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524686400000',
      day: '1524686400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524688200000',
      day: '1524688200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524690000000',
      day: '1524690000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524691800000',
      day: '1524691800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524693600000',
      day: '1524693600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524695400000',
      day: '1524695400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524697200000',
      day: '1524697200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524699000000',
      day: '1524699000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524700800000',
      day: '1524700800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524702600000',
      day: '1524702600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524744000000',
      day: '1524744000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524745800000',
      day: '1524745800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524747600000',
      day: '1524747600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524749400000',
      day: '1524749400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524751200000',
      day: '1524751200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524753000000',
      day: '1524753000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524754800000',
      day: '1524754800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524756600000',
      day: '1524756600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524758400000',
      day: '1524758400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524760200000',
      day: '1524760200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524762000000',
      day: '1524762000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524763800000',
      day: '1524763800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524765600000',
      day: '1524765600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524767400000',
      day: '1524767400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524769200000',
      day: '1524769200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524771000000',
      day: '1524771000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524772800000',
      day: '1524772800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524774600000',
      day: '1524774600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524776400000',
      day: '1524776400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524778200000',
      day: '1524778200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524780000000',
      day: '1524780000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524781800000',
      day: '1524781800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524783600000',
      day: '1524783600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524785400000',
      day: '1524785400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524787200000',
      day: '1524787200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524789000000',
      day: '1524789000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524830400000',
      day: '1524830400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524832200000',
      day: '1524832200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524834000000',
      day: '1524834000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524835800000',
      day: '1524835800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524837600000',
      day: '1524837600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524839400000',
      day: '1524839400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524841200000',
      day: '1524841200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524843000000',
      day: '1524843000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524844800000',
      day: '1524844800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524846600000',
      day: '1524846600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524848400000',
      day: '1524848400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524850200000',
      day: '1524850200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524852000000',
      day: '1524852000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524853800000',
      day: '1524853800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524855600000',
      day: '1524855600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524857400000',
      day: '1524857400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524859200000',
      day: '1524859200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524861000000',
      day: '1524861000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524862800000',
      day: '1524862800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524864600000',
      day: '1524864600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524866400000',
      day: '1524866400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524868200000',
      day: '1524868200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524870000000',
      day: '1524870000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524871800000',
      day: '1524871800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524873600000',
      day: '1524873600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524875400000',
      day: '1524875400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524916800000',
      day: '1524916800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524918600000',
      day: '1524918600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524920400000',
      day: '1524920400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524922200000',
      day: '1524922200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524924000000',
      day: '1524924000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524925800000',
      day: '1524925800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524927600000',
      day: '1524927600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524929400000',
      day: '1524929400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524931200000',
      day: '1524931200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524933000000',
      day: '1524933000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524934800000',
      day: '1524934800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524936600000',
      day: '1524936600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524938400000',
      day: '1524938400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524940200000',
      day: '1524940200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524942000000',
      day: '1524942000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524943800000',
      day: '1524943800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524945600000',
      day: '1524945600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524947400000',
      day: '1524947400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524949200000',
      day: '1524949200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524951000000',
      day: '1524951000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524952800000',
      day: '1524952800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524954600000',
      day: '1524954600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524956400000',
      day: '1524956400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524958200000',
      day: '1524958200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524960000000',
      day: '1524960000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524961800000',
      day: '1524961800000',
      booked: false,
      daysUntil: 4,
      room: 1
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
