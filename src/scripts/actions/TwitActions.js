var TwitDispatcher = require('../dispatcher/TwitDispatcher');

var TwitActions = {

  create: function(text) {
    TwitDispatcher.handleViewAction({
      actionType: "TWIT_CREATE",
      text: text
    });
  },
};

module.exports = TwitActions;
