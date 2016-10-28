'use strict';
/* global getJSONFixture */
describe('angular-opensensemap', function () {

  describe('OpenSenseMapProvider', function () {

    var OpenSenseMapProvider = {};

    beforeEach(function () {
      module('openSenseMap', function (_OpenSenseMapProvider_) {
        OpenSenseMapProvider = _OpenSenseMapProvider_;
      });
      inject(function () {});
    });

    it('should be defined', function () {
      expect(OpenSenseMapProvider).toBeDefined();
    });

    it('should have a method setBoxId()', function () {
      expect(OpenSenseMapProvider.setBoxId).toBeDefined();
    });

    it('should have a method getBoxId()', function () {
      expect(OpenSenseMapProvider.getBoxId).toBeDefined();
    });

    it('should have a method setApiKey()', function () {
      expect(OpenSenseMapProvider.setApiKey).toBeDefined();
    });

    it('should set the box id', function () {
      expect(OpenSenseMapProvider.setBoxId('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });

    it('should get the box id', function () {
      OpenSenseMapProvider.setBoxId('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
      expect(OpenSenseMapProvider.getBoxId()).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });

    it('should set the api key', function () {
      expect(OpenSenseMapProvider.setApiKey('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    })
  });

  describe('OpenSenseMap', function () {

    beforeEach(module('openSenseMap'));

    var OpenSenseMap;

    beforeEach(inject(function (_OpenSenseMap_) {
      OpenSenseMap = _OpenSenseMap_;
    }));

    it('should be defined', function () {
      expect(OpenSenseMap).toBeDefined();
    });

    it('should be an object', function () {
      expect(typeof OpenSenseMap).toBe('object');
    });

    it('should have a method api()', function () {
      expect(OpenSenseMap.api).toBeDefined();
    });

    it('should have a method getBoxes()', function () {
      expect(OpenSenseMap.getBoxes).toBeDefined();
    });

    it('should have a method getBox()', function () {
      expect(OpenSenseMap.getBox).toBeDefined();
    });
  });
});
