/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Twit = require('./Twit.jsx');
var TwitActions = require('../actions/TwitActions');
var OAuth = require('oauth');
var oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/requesttoken',
  'https://api.twitter.com/oauth/accesstoken',
  'pFtPOLUXBXDtPHokigyXN9UAT',
  'FlGNi9fhU2q3Ucfi5M9czBraY3QxEkPflLntLJgrBjA0ecMpon',
  '1.0A',
  null,
  'HMAC-SHA1'
);
var ENTERKEY_CODE = 13;

require('../../styles/Main_scene.css');

var MainScene = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function () {
    var twits = [];
    for (var key in this.props.twits) {
      twits.push(<Twit key={key} twit={this.props.twits[key]} />);
    }
    return (
      <section id="main">
        <input key="input" onChange={this.onChange} onKeyDown={this.onKeyDown} value={this.state.value} autoFocus={true} />
        <ul id="todo-list">{twits}</ul>
      </section>
    );
  },

  onEnter: function() {
    TwitActions.clearAll();
    var text = this.state.value.trim();
    if (text[0] === "@") {
      this.getUserTimeline(text.substr(1));
    } else if (text[0] === "#") {
      this.getTwits(text.substr(1));
    }
  },

  onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  onKeyDown: function(event) {
    if (event.keyCode === ENTERKEY_CODE) {
      this.onEnter();
    }
  },

  getUserTimeline: function(user) {
    oauth.get(
      'https://api.twitter.com/1.1/statuses/usertimeline.json?screen_name=' + user,
      '978792919-URT380OU0ofxqomr8hUPXOxgoJAMRqUODAGQEdoQ', //test user token
      '4Gx37DpzwwVcBszGP51hUwegmuFnSsxUZ9IbuizUbbfMW', //test user secret
      function (e, data, res){
        if (e) console.error(e);
        var twits = JSON.parse(data);
        TwitActions.create(twits);
      });
  },

  getTwits: function(hashtag) {
    oauth.get(
      'https://api.twitter.com/1.1/search/tweets.json?q=' + hashtag + '&resulttype=recent',
      '978792919-URT380OU0ofxqomr8hUPXOxgoJAMRqUODAGQEdoQ', //test user token
      '4Gx37DpzwwVcBszGP51hUwegmuFnSsxUZ9IbuizUbbfMW', //test user secret
      function (e, data, res){
        if (e) console.error(e);
        var twits = JSON.parse(data);
        TwitActions.create(twits["statuses"]);
      });
  }
});

module.exports = MainScene;
