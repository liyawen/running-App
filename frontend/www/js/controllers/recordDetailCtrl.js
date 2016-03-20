angular.module('starter.controllers')

.controller('recordDetailCtrl', function ($scope, $ionicPopup, $rootScope, $stateParams, Record, back) {
  $scope.detail = $rootScope.currentDetail;
  $scope.goback = back;
  $scope.labels = [' ', ' ', ' ', ' ', ' ', ' ', ' '];
  $scope.series = [''];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40]
  ];
})
