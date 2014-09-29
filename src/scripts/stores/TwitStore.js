var TwitDispatcher = require('../dispatcher/TwitDispatcher');
var EventEmitter = require('events').EventEmitter;
var TwitConstants = require('../constants/TwitConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _twits = [];

function create(twits) {
  for (var i = 0; i < twits.length; i++) {
    _twits[i] = {
      id: i,
      text: twits[i].text
    };
  }
};

function clearAll(twits) {
  _twits.length = 0;
};

var TwitStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _twits;
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


TwitDispatcher.register(function(payload) {
  var action = payload.action;
  var twits = action.twits;

  switch(action.actionType) {
    case TwitConstants.CREATE_TWITS:
      if (twits && twits.length > 0) {
        create(twits);
      }
      break;
    case TwitConstants.CLEAR_TWITS:
      clearAll();
      break;
    default:
      return true;
  }

  TwitStore.emitChange();
  return true;
});

module.exports = TwitStore;


