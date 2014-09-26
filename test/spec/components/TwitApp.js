'use strict';

describe('Main', function () {
  var TwitApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    TwitApp = require('../../../src/scripts/components/TwitApp.jsx');
    component = TwitApp();
  });

  it('should create a new instance of TwitApp', function () {
    expect(component).toBeDefined();
  });
});
