var TwitDispatcher = require('../dispatcher/TwitDispatcher');
var TwitConstants = require('../constants/TwitConstants');

var TwitActions = {

  create: function(twits) {
    TwitDispatcher.handleViewAction({
      actionType: TwitConstants.CREATE_TWITS,
      twits: twits
    });
  },

  clearAll: function() {
    TwitDispatcher.handleViewAction({
      actionType: TwitConstants.CLEAR_TWITS
    });
  }
};

module.exports = TwitActions;
