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
      firstName: 'Jorge Alberto',
      lastName: 'Beauregard Bravo',
      email: 'blurdischarger@hotmail.com',
      remainingHours: 6,
      rfid: '0f:44:7f:64',
      password: '$2a$10$1Hd9VMmtZdH40WaRuJrb0eY9FynlA3wWGl2VN1pZO7mArVLs92LTO'
    },
    {
      firstName: 'Franscisco Julián',
      lastName: 'Huerta',
      email: 'nosep@facebook.com',
      remainingHours: 6,
      rfid: '57:16:76:62',
      password: 'gato'
    },
    {
      firstName: 'Juan Andrés',
      lastName: 'Reynoso Mazoy',
      email: 'andres.reynoso.mazoy@gmail.com',
      remainingHours: 6,
      rfid: 'ef:d5:fc:ec',
      password: 'ff'
    },
    {
      firstName: 'Tabatha Tabeli',
      lastName: 'Acosta Pastrano',
      email: 'taba@example.com',
      remainingHours: 6,
      rfid: '95:6b:85:06',
      password: 'ff'
    },
    {
      firstName: 'White',
      lastName: 'Card',
      email: 'white@example.com',
      remainingHours: 6,
      rfid: '1A:B9:E2:2B',
      password: 'ff'
    },
    {
      firstName: 'Blue',
      lastName: 'Card',
      email: 'blue@example.com',
      remainingHours: 6,
      rfid: '3e:8b:7c:5b',
      password: 'ff'
    },
    {
      firstName: 'Begoña',
      lastName: 'Montes Gómez',
      email: 'bego@example.com',
      remainingHours: 6,
      rfid: '2f:ca:3f:19',
      password: 'ff'
    },
    {
      firstName: 'Karla',
      lastName: 'de Emprendimiento',
      email: 'karla@example.com',
      remainingHours: 6,
      rfid: '6b:0a:2f:5c',
      password: 'ff'
    },
    {
      firstName: 'Ame',
      lastName: 'de Emprendimiento',
      email: 'ame@example.com',
      remainingHours: 6,
      rfid: '37:49:89:5E',
      password: 'ff'
    },
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
      time: '1524484800000',
      day: '1524484800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524486600000',
      day: '1524486600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524488400000',
      day: '1524488400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524490200000',
      day: '1524490200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524492000000',
      day: '1524492000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524493800000',
      day: '1524493800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524495600000',
      day: '1524495600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524497400000',
      day: '1524497400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524499200000',
      day: '1524499200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524501000000',
      day: '1524501000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524502800000',
      day: '1524502800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524504600000',
      day: '1524504600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524506400000',
      day: '1524506400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524508200000',
      day: '1524508200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524510000000',
      day: '1524510000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524511800000',
      day: '1524511800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524513600000',
      day: '1524513600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524515400000',
      day: '1524515400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524517200000',
      day: '1524517200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524519000000',
      day: '1524519000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524520800000',
      day: '1524520800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524522600000',
      day: '1524522600000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524524400000',
      day: '1524524400000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524526200000',
      day: '1524526200000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524528000000',
      day: '1524528000000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524529800000',
      day: '1524529800000',
      booked: false,
      daysUntil: 0,
      room: 1
    },
    {
      time: '1524571200000',
      day: '1524571200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524573000000',
      day: '1524573000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524574800000',
      day: '1524574800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524576600000',
      day: '1524576600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524578400000',
      day: '1524578400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524580200000',
      day: '1524580200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524582000000',
      day: '1524582000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524583800000',
      day: '1524583800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524585600000',
      day: '1524585600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524587400000',
      day: '1524587400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524589200000',
      day: '1524589200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524591000000',
      day: '1524591000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524592800000',
      day: '1524592800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524594600000',
      day: '1524594600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524596400000',
      day: '1524596400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524598200000',
      day: '1524598200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524600000000',
      day: '1524600000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524601800000',
      day: '1524601800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524603600000',
      day: '1524603600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524605400000',
      day: '1524605400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524607200000',
      day: '1524607200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524609000000',
      day: '1524609000000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524610800000',
      day: '1524610800000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524612600000',
      day: '1524612600000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524614400000',
      day: '1524614400000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524616200000',
      day: '1524616200000',
      booked: false,
      daysUntil: 1,
      room: 1
    },
    {
      time: '1524657600000',
      day: '1524657600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524659400000',
      day: '1524659400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524661200000',
      day: '1524661200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524663000000',
      day: '1524663000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524664800000',
      day: '1524664800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524666600000',
      day: '1524666600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524668400000',
      day: '1524668400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524670200000',
      day: '1524670200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524672000000',
      day: '1524672000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524673800000',
      day: '1524673800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524675600000',
      day: '1524675600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524677400000',
      day: '1524677400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524679200000',
      day: '1524679200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524681000000',
      day: '1524681000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524682800000',
      day: '1524682800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524684600000',
      day: '1524684600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524686400000',
      day: '1524686400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524688200000',
      day: '1524688200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524690000000',
      day: '1524690000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524691800000',
      day: '1524691800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524693600000',
      day: '1524693600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524695400000',
      day: '1524695400000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524697200000',
      day: '1524697200000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524699000000',
      day: '1524699000000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524700800000',
      day: '1524700800000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524702600000',
      day: '1524702600000',
      booked: false,
      daysUntil: 2,
      room: 1
    },
    {
      time: '1524744000000',
      day: '1524744000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524745800000',
      day: '1524745800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524747600000',
      day: '1524747600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524749400000',
      day: '1524749400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524751200000',
      day: '1524751200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524753000000',
      day: '1524753000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524754800000',
      day: '1524754800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524756600000',
      day: '1524756600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524758400000',
      day: '1524758400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524760200000',
      day: '1524760200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524762000000',
      day: '1524762000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524763800000',
      day: '1524763800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524765600000',
      day: '1524765600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524767400000',
      day: '1524767400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524769200000',
      day: '1524769200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524771000000',
      day: '1524771000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524772800000',
      day: '1524772800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524774600000',
      day: '1524774600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524776400000',
      day: '1524776400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524778200000',
      day: '1524778200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524780000000',
      day: '1524780000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524781800000',
      day: '1524781800000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524783600000',
      day: '1524783600000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524785400000',
      day: '1524785400000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524787200000',
      day: '1524787200000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524789000000',
      day: '1524789000000',
      booked: false,
      daysUntil: 3,
      room: 1
    },
    {
      time: '1524830400000',
      day: '1524830400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524832200000',
      day: '1524832200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524834000000',
      day: '1524834000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524835800000',
      day: '1524835800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524837600000',
      day: '1524837600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524839400000',
      day: '1524839400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524841200000',
      day: '1524841200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524843000000',
      day: '1524843000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524844800000',
      day: '1524844800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524846600000',
      day: '1524846600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524848400000',
      day: '1524848400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524850200000',
      day: '1524850200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524852000000',
      day: '1524852000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524853800000',
      day: '1524853800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524855600000',
      day: '1524855600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524857400000',
      day: '1524857400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524859200000',
      day: '1524859200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524861000000',
      day: '1524861000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524862800000',
      day: '1524862800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524864600000',
      day: '1524864600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524866400000',
      day: '1524866400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524868200000',
      day: '1524868200000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524870000000',
      day: '1524870000000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524871800000',
      day: '1524871800000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524873600000',
      day: '1524873600000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
    {
      time: '1524875400000',
      day: '1524875400000',
      booked: false,
      daysUntil: 4,
      room: 1
    },
  ],
  bookings: [
  ]
};
