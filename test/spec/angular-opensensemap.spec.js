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
    });
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

    it('should turn an object into a query string', function () {
      expect(OpenSenseMap.toQueryString({a: 't', b: '4', c: 'q'})).toBe('a=t&b=4&c=q');
    });

    it('should have a method validateAPiKey', function () {
      expect(OpenSenseMap.validateApiKey).toBeDefined();
    });

    it('should have a method setApiKey()', function () {
      expect(OpenSenseMap.setApiKey).toBeDefined();
    });

    it('should set the api key', function () {
      expect(OpenSenseMap.setApiKey('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });

    describe('OpenSenseMap.api', function () {
      var $httpBackend;
      var OpenSenseMap;
      var api = 'https://api.opensensemap.org';

      beforeEach(inject(function(_OpenSenseMap_, _$httpBackend_) {
        OpenSenseMap = _OpenSenseMap_;
        $httpBackend = _$httpBackend_;
        jasmine.getJSONFixtures().fixturesPath='base/test/mock';
      }));

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
      });

      it('should call the api with headers', function () {
        $httpBackend.when('GET', api + '/users/57000b8745fd40c8196ad04c', null, 
          function (headers) {
            return headers['X-ApiKey'] === 'TESTING';
          }
        ).respond({});

        var result;
        OpenSenseMap.api('/users/57000b8745fd40c8196ad04c', 'GET', null, null, {
          'X-ApiKey': 'TESTING'
        }).then(function (data) {
          result = data;
        });

        $httpBackend.flush();

        expect(result).toBeDefined();
      });
    });

    describe('Boxes', function () {
      var $httpBackend;
      var OpenSenseMap;
      var api = 'https://api.opensensemap.org';

      beforeEach(inject(function(_OpenSenseMap_, _$httpBackend_) {
        OpenSenseMap = _OpenSenseMap_;
        $httpBackend = _$httpBackend_;
      }));

      describe('OpenSenseMap.getBoxes', function () {

        it('should make an ajax call to https://api.opensensemap.org/boxes', function () {

          $httpBackend.when('GET', api + '/boxes').respond(getJSONFixture('boxes.json'));

          var result;
          OpenSenseMap
            .getBoxes()
            .then(function (data) {
              result = data;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Array).toBeTruthy();
        });
      });

      describe('OpenSenseMap.getBox', function () {

        it('should make an ajax call to https://api.opensensemap.org/boxes/57000b8745fd40c8196ad04c', function () {

          $httpBackend.when('GET', api + '/boxes/57000b8745fd40c8196ad04c').respond(getJSONFixture('box.json'));

          expect(OpenSenseMap.getBox('57000b8745fd40c8196ad04c')).toBeDefined();
        });

        it('should resolve to an object of a box', function () {
          $httpBackend.when('GET', api + '/boxes/57000b8745fd40c8196ad04c').respond(200, getJSONFixture('box.json'));

          var result;
          OpenSenseMap
            .getBox('57000b8745fd40c8196ad04c')
            .then(function (data) {
              result = data;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
        });

        it('should reject the promise and respond with 404 - NotFoundError', function () {
          $httpBackend.when('GET', api + '/boxes/57000b8745fd40c8196ad04d').respond(404, getJSONFixture('box.error.json'));

          var result;
          OpenSenseMap.getBox('57000b8745fd40c8196ad04d').then(function () {
          }, function (reason) {
            result = reason;
          });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
          expect(result.code).toBe('NotFoundError');
        });

        it('should reject the promise and respond with 400 - BadRequestError', function () {
          $httpBackend.when('GET', api + '/boxes/57000b8745fd40c8').respond(400, getJSONFixture('box.invalid-mongo-objectid.json'));

          var result;
          OpenSenseMap.getBox('57000b8745fd40c8').then(function () {
          }, function (reason) {
            result = reason;
          });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
          expect(result.code).toBe('BadRequestError');
        });
      });
    });

    describe('Users', function () {
      var $httpBackend;
      var OpenSenseMap;
      var api = 'https://api.opensensemap.org';

      beforeEach(inject(function (_OpenSenseMap_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        OpenSenseMap = _OpenSenseMap_;
      }));

      describe('OpenSenseMap.validateApiKey', function () {
        it('should validate the apikey for a box', function () {
          spyOn(OpenSenseMap, 'api');

          OpenSenseMap.setApiKey('TESTING');

          OpenSenseMap.validateApiKey('57000b8745fd40c8');

          expect(OpenSenseMap.api).toHaveBeenCalled();
          expect(OpenSenseMap.api).toHaveBeenCalledWith('/users/57000b8745fd40c8', 'GET', null, null, {'X-ApiKey': 'TESTING'});
        });

        it('should resolve the promise and respond that the ApiKey is valid with 200 - Authorized', function () {
          $httpBackend.when('GET', api + '/users/57000b8745fd40c8').respond(200, getJSONFixture('user.json'));

          OpenSenseMap.setApiKey('TESTING');

          var result;
          OpenSenseMap
            .validateApiKey('57000b8745fd40c8')
            .then(function (data) {
              result = data;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
          expect(result.code).toBe('Authorized');
        });

        it('should resolve the promise and respond that the ApiKey is invalid with 403 - NotAuthorized', function () {
          $httpBackend.when('GET', api + '/users/57000b8745fd40c8').respond(404, getJSONFixture('user.invalid-apikey.json'));

          OpenSenseMap.setApiKey('TESTING2');

          var result;
          OpenSenseMap
            .validateApiKey('57000b8745fd40c8')
            .then(function () {}, function (reason) {
              result = reason;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
          expect(result.code).toBe('NotAuthorized');
        });
      });
    });

    describe('Measurements', function () {
      var $httpBackend;
      var OpenSenseMap;
      var api = 'https://api.opensensemap.org';

      beforeEach(inject(function (_OpenSenseMap_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        OpenSenseMap = _OpenSenseMap_;
      }));

      describe('OpenSenseMap.getLastMeasurements', function () {
        it('should get the last measurements for a single box', function () {
          $httpBackend.when('GET', api + '/boxes/57000b8745fd40c8/sensors').respond(200, getJSONFixture('last.measurements.json'));

          var result;
          OpenSenseMap
            .getLastMeasurements('57000b8745fd40c8')
            .then(function (data) {
              result = data;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Object).toBeTruthy();
          expect(result.sensors instanceof Array).toBeTruthy();
        });
      });
    });

    describe('Stats', function () {
      var $httpBackend;
      var OpenSenseMap;
      var api = 'https://api.opensensemap.org';

      beforeEach(inject(function (_OpenSenseMap_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        OpenSenseMap = _OpenSenseMap_;
      }));

      describe('OpenSenseMap.getStats', function () {
        it('should get statistics about the database', function () {
          $httpBackend.when('GET', api + '/stats').respond(200, getJSONFixture('stats.json'));

          var result;
          OpenSenseMap
            .getStats()
            .then(function (data) {
              result = data;
            });

          $httpBackend.flush();
          expect(result).toBeDefined();
          expect(result instanceof Array).toBeTruthy();
        });
      });
    });
  });
});
