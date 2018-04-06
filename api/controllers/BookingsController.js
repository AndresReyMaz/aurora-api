/**
 * BookingsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
module.exports = {
  list: (req, res) => {
    //Bookings.find().populate('room').then(data => res.status(200).json(data)).catch(err => res.status(400).json({error: err}));
    let query = `SELECT * FROM endusers INNER JOIN bookings ON endusers.id =  bookings.enduser 
                  INNER JOIN timeslots ON bookings.timeslot = timeslots.id 
                  INNER JOIN rooms ON timeslots.room = rooms.id;`;
    sails.log('Booking query');
    return sails.getDatastore().sendNativeQuery(query)
      .then(data => res.status(200).json(data.rows))
      .catch(err => res.status(400).json({error: err}));
  },

  create: async function(req, res) {
    // First: check that a user with the given id exists
    var record = await Endusers.findOne({ id: req.body.enduser });
    if (record === undefined) {
      sails.log('Record was undefined');
    } else {
      sails.log(record.enduser);
      Bookings.create({
        enduser: req.body.enduser
      }, (err) => {
        if (err) {
          res.send(400);
        } else {
          res.ok();
        }
      });
    }
  },

};

