angular.module('starter.controllers')

.controller('userInfoCtrl', function ($scope, $rootScope, $cookies, $ionicActionSheet, $timeout, $state, $ionicPopup, $stateParams, UserInfo, checkLogin) {
  if (!checkLogin($state)) return;

  $scope.email = $rootScope.userInfo.email;
  $scope.userArray = UserInfo.getMsg();

  $scope.backHome = function () {
    $scope.nickname = $rootScope.userInfo.nickname;
    $state.go('homePage');
  };

  $scope.show = function(x) {
    UserInfo.show(x, $scope, $ionicPopup);
  };

  $scope.goResetPassword = function () {
    $state.go('resetPassword');
  };

  $scope.changeGendle = function (value) {
    UserInfo.changeGendle($scope, value, $ionicPopup);
  };
})
