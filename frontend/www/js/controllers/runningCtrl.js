angular.module('starter.controllers')

.controller('runningCtrl', function ($scope, $state, $stateParams, Running, back) {
  $scope.goback = back;
  
});
