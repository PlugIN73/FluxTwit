/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/Twit.css');

var Twit = React.createClass({
  render: function () {
    var twit = this.props.twit;
    return (
      <li key={twit.id}>
       <div className="view">
         <label onDoubleClick={this._onDoubleClick}>
           {twit.text}
         </label>
       </div>
     </li>
    );
  }
});

module.exports = Twit;
