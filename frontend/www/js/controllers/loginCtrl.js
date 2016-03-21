angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $state, $ionicPopup, Login, commonService) {
  commonService.confirmLogin();
  // $scope.getUserName = function () {
  //  login.getUser($scope);
  // }
  $scope.email = '';
  $scope.password = '';
  $scope.confirmPassword = '';
  $scope.goResetPassword = function () {
    $state.go('resetPassword');
  }
  $scope.sendUserMsg = function () {
    Login.sendUserMsg($scope, $ionicPopup);
  }

  // $scope.register = function () {
  //     $scope.confirmPassword.
  // }
  $scope.jumpRegister = function () {
    Login.jumpRegister($scope, $ionicPopup);
    }
  }
);
