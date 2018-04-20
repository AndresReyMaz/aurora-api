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
    sails.log('The current time is:' + time);
    if (time.getMinutes() < 30) {
      time.setMinutes(0);
    } else {
      time.setMinutes(30);
    }
    time.setSeconds(0);
    time.setMilliseconds(0);
    sails.log('Returning time: ' + time);
    // Send back the result through the success exit.
    return exits.success(time);

  }


};

