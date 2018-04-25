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
    let time = new Date();
    if (time.getMinutes() < 30) {
      time.setMinutes(0);
    } else {
      time.setMinutes(30);
    }
    time.setSeconds(0);
    time.setMilliseconds(0);
    // Send back the result through the success exit.
    return exits.success(time);

  }


};

