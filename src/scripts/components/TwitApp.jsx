/**
* @jsx React.DOM
*/

'use strict';

var React = require('react/addons');
var Twitter = require('twitter-js-client').Twitter;
var config = {
  "consumerKey": "pFtPOLUXBXDtPHokigyXN9UAT",
  "consumerSecret": "FlGNi9fhU2q3Ucfi5M9czBraY3QxEkPflLntLJgrBjA0ecMpon",
  "accessToken": "978792919-URT380OU0ofxqomr8hUPXOxgoJAMRqUODAGQEdoQ",
  "accessTokenSecret": "4Gx37DpzwwVcBszGP51hUwegmuFnSsxUZ9IbuizUbbfMW",
  "callBackUrl": "{callBackUrl}"
};
var error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};
var success = function (data) {
  console.log('Data [%s]', data);
};

var twitter = new Twitter(config);
var a = twitter.getMentionsTimeline({count: 10},  error, success);
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

var MainScene = require('./Main_scene.jsx');
var TwitStore = require('../stores/TwitStore');

// CSS
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
