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
         <input className="toggle" type="checkbox" />
         <label onDoubleClick={this._onDoubleClick}>
           {twit.text}
         </label>
         <button className="destroy" onClick={this._onDestroyClick} />
       </div>
     </li>
    );
  }
});

module.exports = Twit;
