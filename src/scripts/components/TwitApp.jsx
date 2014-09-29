/**
* @jsx React.DOM
*/

'use strict';

var React = require('react/addons');

var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var MainScene = require('./Main_scene.jsx');
var TwitStore = require('../stores/TwitStore');

require('../../styles/reset.css');
require('../../styles/main.css');


function getTwitState() {
  return {
    allTwits: TwitStore.getAll(),
  };
}

var TwitApp = React.createClass({
  getInitialState: function() {
    return getTwitState();
  },

  componentDidMount: function() {
    TwitStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TwitStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className='main'>
        <MainScene twits={this.state.allTwits} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTwitState());
  }
});

React.renderComponent(<TwitApp />, document.getElementById('content')); // jshint ignore:line

module.exports = TwitApp;
