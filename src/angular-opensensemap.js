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

      /**
       * API Base URL
       */
      settings.apiBaseUrl = 'https://api.opensensemap.org';

      this.$get = ['$q', '$http', function ($q, $http) {
        function NgOpenSenseMap () {
          this.boxId = settings.boxId;
          this.apiKey = settings.apiKey;
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
          getBoxes: function () {
            return this.api('/boxes');
          },
          getBox: function (boxId) {
            return this.api('/boxes/' + boxId);
          }
        };

        return new NgOpenSenseMap();
      }];

    });

}(window, angular));
