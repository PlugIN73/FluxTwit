/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Twit = require('./Twit.jsx');
var TwitActions = require('../actions/TwitActions');
var OAuth = require('oauth');
var ENTER_KEY_CODE = 13;

require('../../styles/Main_scene.css');

var Main_scene = React.createClass({

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
        <input key="input" onBlur={this._save} onChange={this._onChange} onKeyDown={this._onKeyDown} value={this.state.value} autoFocus={true} />
        <ul id="todo-list">{twits}</ul>
      </section>
    );
  },

  _save: function() {
    TwitActions.clearAll();
    var text = this.state.value;
    if (text.trim()){
      this._getTwits(text);
    }
  },

  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  },

  _getTwits: function(user) {

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
      'https://api.twitter.com/1.1/search/tweets.json?q=' + user + '&result_type=recent',
      '978792919-URT380OU0ofxqomr8hUPXOxgoJAMRqUODAGQEdoQ', //test user token
      '4Gx37DpzwwVcBszGP51hUwegmuFnSsxUZ9IbuizUbbfMW', //test user secret
      function (e, data, res){
        if (e) console.error(e);
        var twits = JSON.parse(data);
        TwitActions.create(twits["statuses"]);
      });
  }
});

module.exports = Main_scene;
