/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var Twit = require('./Twit.jsx');
var TwitActions = require('../actions/TwitActions');
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
    var text = this.state.value;
    if (text.trim()){
      TwitActions.create(text);
    }
    this.setState({
      value: ''
    });
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
  }
});

module.exports = Main_scene;
