angular.module('starter.controllers')

.controller('homePageCtrl', function(
  $scope,
  $state,
  $ionicPopup,
  $cookies,
  $rootScope,
  $timeout,
  $ionicSideMenuDelegate,
  homePage,
  checkLogin
) {
  if (!checkLogin($state)) return;

  $ionicSideMenuDelegate.toggleLeft();
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.nickname = $rootScope.userInfo.nickname;
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.nickname = $rootScope.userInfo.nickname;
  })

  homePage.getRunRecords($scope, $ionicPopup, function (records) {
    $scope.runRecords = records;
  });

  $scope.logout = function() {
    $cookies.remove('userInfo');
    $rootScope.userInfo = undefined;
    $state.go('login');
  }

  $scope.startRun = function () {
    $state.go('running');
  }
})
