angular.module('starter.controllers')

.controller('userInfoCtrl', function ($scope, $rootScope, $cookies, $state, $ionicPopup, $stateParams, UserInfo) {
  if (!$rootScope.userInfo) {
    $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
  }
  $scope.backHome = function () {
  	$state.go('homePage');
  }

	
})
