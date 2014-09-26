var TwitDispatcher = require('../dispatcher/TwitDispatcher');
var EventEmitter = require('events').EventEmitter;
var TwitConstants = require('../constants/TwitConstants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';

var _twits = {};

function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _twits[id] = {
    id: id,
    text: text
  };
}

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
  var text;

  switch(action.actionType) {
    case TwitConstants.TWIT_CREATE:
      text = action.text.trim();
      console.log(text);
      if (text !== '') {
        create(text);
      }
      break;
    default:
      return true;
  }

  TwitStore.emitChange();
  return true;
});

module.exports = TwitStore;


