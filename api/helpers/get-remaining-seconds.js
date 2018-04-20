module.exports = {


  friendlyName: 'Get remaining seconds',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'Remaining seconds',

    },

  },


  fn: async function (inputs, exits) {

    // Get remaining seconds.
    let time = Date.now();
    let remainingSeconds = 0;
    if (time.getMinutes() < 30) {
      remainingSeconds = (60 - time.getSeconds()) + 60 * (30 - time.getMinutes());
    } else {
      remainingSeconds = (60 - time.getSeconds()) + 60 * (60 - time.getMinutes());
    }
    // Send back the result through the success exit.
    return exits.success(remainingSeconds);

  }


};

