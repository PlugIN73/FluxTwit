/**
* @jsx React.DOM
*/

'use strict';

var React = require('react/addons');

var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  'pFtPOLUXBXDtPHokigyXN9UAT',
  'FlGNi9fhU2q3Ucfi5M9czBraY3QxEkPflLntLJgrBjA0ecMpon',
  '1.0A',
  null,
  'HMAC-SHA1'
);

oauth.get(
  'https://api.twitter.com/1.1/search/tweets.json?q=%23Russia&result_type=recent',
  '978792919-URT380OU0ofxqomr8hUPXOxgoJAMRqUODAGQEdoQ', //test user token
  '4Gx37DpzwwVcBszGP51hUwegmuFnSsxUZ9IbuizUbbfMW', //test user secret
  function (e, data, res){
    if (e) console.error(e);
    console.log(JSON.parse(data));
  });

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
