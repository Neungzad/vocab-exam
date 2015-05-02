'use strict';

/**
 * @ngdoc overview
 * @name cutepApp
 * @description
 * # cutepApp
 *
 * Main module of the application.
 */
angular
  .module('cutepApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'oitozero.ngSweetAlert'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/vocab', {
        templateUrl: 'views/vocab.html',
        controller: 'VocabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
