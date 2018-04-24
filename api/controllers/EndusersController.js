/**
 * EndusersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: (req, res) => {
    Endusers.find({}, (err, results) => {
      if (err) {
        res.send(400);
      } else {
        res.send(results);
      }
    });
  },

  create: (req, res) => {
    Endusers.create( {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      remainingHours: req.body.remainingHours },
    (err) => {
      if (err) {
        res.send(400);
      } else {
        res.ok();
      }
    });
  },



  getLatestBooking: async (req, res) => {
    //let bookings = await Endusers.findOne({ id: req.body.id });
    sails.log(req.params.enduserid);
    /*Bookings.find({
      where: {
        enduser: req.params.enduserid,
      }
    }, (err, results) => {
      if (err) {
        res.send(400);
      } else {
        res.send(results);
      }
    });
    */
    let bookings = await Bookings.find({
      enduser: req.params.enduserid,
    }).populate('timeslot');
    // Sort the bookings by timeslot day and time, soonest first
    let latestBooking = await bookings.sort((a, b) => {
      if (a.timeslot.day === b.timeslot.day) {
        if (a.timeslot.time < b.timeslot.time) {
          return -1;
        } else if (a.timeslot.time > b.timeslot.time) {
          return 1;
        } else {
          return 0;
        }
      } else {
        if (a.timeslot.day < b.timeslot.day) {
          return -1;
        } else if (a.timeslot.day > b.timeslot.day) {
          return 1;
        } else {
          return 0;
        }
      }
    })[0];
    console.log(latestBooking.timeslot.id);
    let toSend = await Timeslots.findOne({ id: latestBooking.timeslot.id }).populate('room');
    toSend.idBooking = latestBooking.id;
    return res.json(toSend);
  },

  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send( { err: 'El usuario o contraseña están vacíos'} );
    }
    let email = req.body.email;
    sails.log(req.body);
    let password = req.body.password;

    let enduser = await Endusers.findOne( { email: req.body.email } );

    if (enduser === undefined) {
      return res.status(400).send( {err : 'Usuario no encontrado '} );
    }

    sails.bcrypt.compare(password, enduser.password, (err, check) => {
      if (check) {
        let data = sails.jwt.encode({
          id: enduser.id,
          iat: sails.moment().unix(),
          exp: sails.moment().add(600, 'second').unix
        },
        sails.config.session.secret );
        res.status(200).send({
          token: data,
          enduser: enduser.id,
          expirationTime: 600
        });
      } else {
        res.status(400).send({ err: 'Contraseña incorrecta. ' + err });
      }
    });

  },

};

