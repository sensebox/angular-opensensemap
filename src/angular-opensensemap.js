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

      this.$get = ['$http', function ($http) {

        function NgOpenSenseMap () {
          this.apiBaseUrl = settings.apiBaseUrl;
          this.boxId = settings.boxId;
          this.apiKey = settings.apiKey;
          this.toQueryString = utils.toQueryString;
        }

        NgOpenSenseMap.prototype = {
          api: function (endpoint, method, params, data, headers) {

            return $http({
              url: this.apiBaseUrl + endpoint,
              method: method ? method : 'GET',
              params: params,
              data: data,
              headers: headers,
              withCredentials: false
            })
            .then(function (data) {
              return data;
            });
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
          createBox: function (data) {
            return this.api('/boxes', 'POST', null, data);
          },
          updateBox: function (boxId, data) {
            return this.api('/boxes/' + boxId, 'PUT', null, data, this._auth());
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
