angular.module('starter.controllers')

.controller('hardwareConnectCtrl', function ($scope, $state, $stateParams, HardwareConnect, back) {
  function getText() {
    return $scope.g && '开始连接' || '放弃连接';
  }
  $scope.goback = back;
  $scope.g = true;
  $scope.text = getText();
  $scope.tryConnect = function () {
  	$scope.g = !$scope.g;
    $scope.text = getText();
  	HardwareConnect.tryConnect();
  }

});
