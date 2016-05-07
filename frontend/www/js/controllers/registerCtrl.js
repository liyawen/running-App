angular.module('starter.controllers')

.controller('registerCtrl', function ($scope, $state, $ionicPopup, Register, back) {

  $scope.back = back;

  $scope.userMsg = Register.all();

  $scope.show = function(x) {
    Register.show(x, $scope, $ionicPopup);
  };

  $scope.getAllMsg = function () {
    Register.getAllMsg($scope, $ionicPopup);
  }
})
