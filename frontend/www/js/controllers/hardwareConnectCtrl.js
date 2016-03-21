angular.module('starter.controllers')

.controller('hardwareConnectCtrl', function ($scope, $state, $stateParams, HardwareConnect, back) {
  $scope.goback = back;
  $scope.g = true;
  $scope.tryConnect = function () {
  	$scope.g = false;
  	HardwareConnect.tryConnect();
  }
  
});
