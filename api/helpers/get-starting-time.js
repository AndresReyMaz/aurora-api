module.exports = {


  friendlyName: 'Get starting time',


  description: 'Get the previous time (in miliseconds) closest to the current time which is passed as parameter',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Starting time',
    },

  },


  fn: async function (inputs, exits) {

    // Get starting time.
    let time = Date.now();
    sails.log('The current time is:' + time);
    if (time.getMinutes() < 30) {
      time.setMinutes(0);
    } else {
      time.setMinutes(30);
    }
    // Send back the result through the success exit.
    return exits.success(time);

  }


};

