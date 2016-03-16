angular.module('starter.controllers')

.controller('homePageCtrl', function($scope, $state,$ionicSideMenuDelegate, Login) {
     $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


})