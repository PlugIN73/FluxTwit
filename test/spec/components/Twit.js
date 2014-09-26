'use strict';

describe('Twit', function () {
  var Twit, component;

  beforeEach(function () {
    Twit = require('../../../src/scripts/components/Twit.jsx');
    component = Twit();
  });

  it('should create a new instance of Twit', function () {
    expect(component).toBeDefined();
  });
});
