angular
  .module('exampleApp', ['openSenseMap'])
  .config(function (OpenSenseMapProvider) {
    OpenSenseMapProvider.setBoxId('123456789123456789');
    OpenSenseMapProvider.setApiKey('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  })
  .controller('MainController', ['$scope', 'OpenSenseMap', function ($scope, OpenSenseMap) {

    // Get all boxes
    OpenSenseMap.getBoxes().then(function (data){
      console.log('=================== Boxes (all) ===================');
      console.log(data);
    });
    // Get one single box
    OpenSenseMap.getBox('57000b8745fd40c8196ad04c').then(function (data){
      console.log('=================== Boxes (single one) ===================');
      console.log(data);
    });
    // Get latest measurements
    OpenSenseMap.getLastMeasurements('57000b8745fd40c8196ad04c').then(function (data){
      console.log('=================== Latest measurements ===================');
      console.log(data);
    });

    // Get openSenseMap database statistics
    OpenSenseMap.getStats().then(function (data){
      console.log('=================== Database statistics ===================');
      console.log(data);
    });
  }]);
