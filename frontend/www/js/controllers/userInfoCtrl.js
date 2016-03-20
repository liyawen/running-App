angular.module('starter.controllers')

.controller('userInfoCtrl', function ($scope, $rootScope, $cookies, $ionicActionSheet, $timeout, $state, $ionicPopup, $stateParams, UserInfo) {
  if (!$rootScope.userInfo) {
    $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
  }

  $scope.email = $rootScope.userInfo.email;
  $scope.userArray = UserInfo.getMsg();

  $scope.backHome = function () {
    $state.go('homePage');
  }

  $scope.show = function(x) {
    UserInfo.show(x, $scope, $ionicPopup);
  };
  
})
