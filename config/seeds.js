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
  endusers: {
    data: [
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
        rfid: '1a:b9:e2:2b',
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
        rfid: '37:49:89:5e',
        password: 'ff'
      },
    ],
    unique: ['rfid'],
  },
  rooms: {
    data: [
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
        inUse: true,
        location: 'Biblioteca Sur'
      },
    ],
    unique: [alias]
  },
  timeslots: [],
  bookings: [
  ]
};
