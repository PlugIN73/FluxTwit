'use strict';

describe('Main_scene', function () {
  var Main_scene, component;

  beforeEach(function () {
    Main_scene = require('../../../src/scripts/components/Main_scene.jsx');
    component = Main_scene();
  });

  it('should create a new instance of Main_scene', function () {
    expect(component).toBeDefined();
  });
});
