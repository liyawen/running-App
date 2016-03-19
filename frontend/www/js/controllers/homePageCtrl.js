angular.module('starter.controllers')

.controller('homePageCtrl', function($scope, $state, $ionicPopup, $cookies, $rootScope, $ionicSideMenuDelegate, homePage) {
  if (!$rootScope.userInfo) {
    $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
  }
  $scope.nickname = $rootScope.userInfo.nickname;

  homePage.getRunRecords($scope, $ionicPopup, function (records) {
    $scope.runRecords = records;
  });

  $ionicSideMenuDelegate.toggleLeft();
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

})
