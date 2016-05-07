// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCookies', 'chart.js'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    cache: false,
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })
  .state('register', {
    url: '/register',
    cache: false,
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })
  .state('homePage', {
    url: '/homePage',
    cache: false,
    templateUrl: 'templates/homePage.html',
    controller: 'homePageCtrl'
  })
  .state('record', {
    url: '/runRecord/:rid',
    cache: false,
    templateUrl: 'templates/record.html',
    controller: 'recordCtrl'
  })
  .state('recordDetail', {
    url: '/recordDetail/:type/:rid/',
    cache: false,
    templateUrl: 'templates/recordDetail.html',
    controller: 'recordDetailCtrl'
  })
  .state('userInfo', {
    url: '/userInfo',
    cache: false,
    templateUrl: 'templates/userInfo.html',
    controller: 'userInfoCtrl'
  })
  .state('running', {
    url: 'running',
    cache: false,
    templateUrl: 'templates/running.html',
    controller: 'runningCtrl'
  })
  .state('hardwareConnect', {
    url: '/hardwareConnect',
    cache: false,
    templateUrl: 'templates/hardwareConnect.html',
    controller: 'hardwareConnectCtrl'
  })
  .state('resetPassword', {
    url: 'resetPassword',
    cache: false,
    templateUrl: 'templates/resetPassword.html',
    controller: 'resetPasswordCtrl'
  });
  $urlRouterProvider.otherwise('/login');
});

angular.module('starter.controllers', ['starter.services']);
angular.module('starter.services',[]);
