(function (window, angular, undefined) {
  'use strict';

  angular
    .module('openSenseMap', [])
    .provider('OpenSenseMap', function () {

      // Module global settings
      var settings = {};
      settings.boxId = null;
      settings.apiKey = null;

      this.setBoxId = function (boxId) {
        settings.boxId = boxId;
        return settings.boxId;
      };

      this.getBoxId = function () {
        return settings.boxId;
      };

      this.setApiKey = function (apiKey) {
        settings.apiKey = apiKey;
        return settings.apiKey;
      };

      var utils = {};
      utils.toQueryString = function (obj) {
        var parts = [];
        angular.forEach(obj, function (value, key) {
          this.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
        }, parts);
        return parts.join('&');
      };

      /**
       * API Base URL
       */
      settings.apiBaseUrl = 'https://api.opensensemap.org';

      this.$get = ['$q', '$http', function ($q, $http) {

        function NgOpenSenseMap () {
          this.apiBaseUrl = settings.apiBaseUrl;
          this.boxId = settings.boxId;
          this.apiKey = settings.apiKey;
          this.toQueryString = utils.toQueryString;
        }

        NgOpenSenseMap.prototype = {
          api: function (endpoint, method, params, data, headers) {
            var deferred = $q.defer();

            $http({
              url: this.apiBaseUrl + endpoint,
              method: method ? method : 'GET',
              params: params,
              data: data,
              headers: headers,
              withCredentials: false
            })
            .success(function (data) {
              deferred.resolve(data);
            })
            .error(function (data) {
              deferred.reject(data);
            });
            return deferred.promise;
          },

          _auth: function () {
            var auth = {
              'X-ApiKey': this.apiKey
            };

            return auth;
          },

          /**
           * Boxes
           */
          getBoxes: function () {
            return this.api('/boxes');
          },
          getBox: function (boxId) {
            return this.api('/boxes/' + boxId);
          },
          getScript: function (boxId) {
            return this.api('/boxes/' + boxId + '/script', 'GET', null, null, this._auth());
          },
          deleteBox: function (boxId) {
            return this.api('/boxes/' + boxId, 'DELETE', null, null, this._auth());
          },

          /**
           * Measurements
           */
          getLastMeasurements: function (boxId) {
            return this.api('/boxes/' + boxId + '/sensors');
          },
          postNewMeasurement: function (boxId) {
            return this.api('/boxes/' + boxId, 'POST', null, null, this._auth());
          },
          getMeasurements: function (boxId) {
            return this.api('/boxes/' + boxId + '/data', 'GET', null, {});
          },

          /**
           * Users
           */
          setApiKey: function (apiKey) {
            this.apiKey = apiKey;
            return apiKey;
          },
          validateApiKey: function (boxId) {
            return this.api('/users/' + boxId, 'GET', null, null, this._auth());
          },

          /**
           * Stats
           */
          getStats: function () {
            return this.api('/stats');
          }
        };

        return new NgOpenSenseMap();
      }];

    });

}(window, angular));
