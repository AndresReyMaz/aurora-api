/**
 * RoomsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function(req, res) {
    Rooms.find({}, (err, results) => {
      if (err) {
        res.send(400);
      } else {
        res.send(results);
      }
    });
  },

  singleRoom: function(req, res) {
    Rooms.findOne({ id: req.params.id }).populate('timeslots', {limit: 1000})
      .then((data) => res.status(200).json(data))
      .catch(err => res.send(400, { err: err } ));
  },

  create: (req, res) => {
    Rooms.create( {
      alias: req.body.alias,
      capacity: req.body.capacity,
      active: req.body.active,
      inUse: req.body.inUse,
      location: req.body.location },
    (err) => {
      if (err) {
        res.send(400);
      } else {
        res.ok();
      }
    });
  }

};

