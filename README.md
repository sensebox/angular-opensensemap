# angular-opensensemap [![Build Status](https://travis-ci.org/sensebox/angular-opensensemap.svg?branch=master)](https://travis-ci.org/sensebox/angular-opensensemap) [![Coverage Status](https://coveralls.io/repos/github/sensebox/angular-opensensemap/badge.svg?branch=master)](https://coveralls.io/github/sensebox/angular-opensensemap?branch=master) [![devDependencies Status](https://david-dm.org/sensebox/angular-opensensemap/dev-status.svg)](https://david-dm.org/sensebox/angular-opensensemap?type=dev) [![Code Climate](https://codeclimate.com/github/sensebox/angular-opensensemap/badges/gpa.svg)](https://codeclimate.com/github/sensebox/angular-opensensemap)

Angular Service to connect to [openSenseMap API](https://docs.opensensemap.org)

## Usage
You can install `angular-opensensemap` via `bower`. Use `--save` flag to save it in your `bower.json` file.

```bower install angular-opensensemap-api --save```

Include it into your angular mondule

```var app = angular.module('osem', ['openSenseMap'])```

An example can be found in [examples/main.controller.js](https://github.com/sensebox/angular-opensensemap/blob/master/examples/main.controller.js#L2)

Most of the functions do not require to authenticate your application. If you need to gain access to advanced box functionalities
then use the `OpenSenseMapProvider` or the different `User` functions:

```js
app.config(function (OpenSenseMapProvider) {
  OpenSenseMapProvider.setBoxId('<BOX_ID>');
  OpenSenseMapProvider.setApiKey('<API_KEY>');
});
```

Example:

```js
app.config(function (OpenSenseMapProvider) {
  OpenSenseMapProvider.setBoxId('123456789123456789');
  OpenSenseMapProvider.setApiKey('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
});
```

### Boxes

#### Get one specific box

```js
OpenSenseMap.getBox('boxID');
```

Example:

```js
OpenSenseMap.getBox('57000b8745fd40c8196ad04c').then(function (data){
  console.log(data);
});
```

#### Get all boxes

```js
OpenSenseMap.getBoxes();
```

Example:

```js
OpenSenseMap.getBoxes().then(function (data){
  console.log(data);
});
```

### Users

#### Set ApiKey

```js
OpenSenseMap.setApiKey('ApiKey');
```

#### Check if ApiKey is valid for box

```js
OpenSenseMap.validateApiKey('box ID');
```

### Measurements

#### Get latest measurements of a box

```js
OpenSenseMap.getLastMeasurements('box ID')
```

Example:

```js
OpenSenseMap.getLastMeasurements('57000b8745fd40c8196ad04c').then(function (data){
  console.log(data);
});
```

### Stats

Get some statistics about the database

```js
OpenSenseMap.getStats();
```

Example:

```js
OpenSenseMap.getStats().then(function (data){
  console.log(data);
});
```
