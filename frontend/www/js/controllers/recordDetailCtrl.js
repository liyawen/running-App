angular.module('starter.controllers')

.controller('recordDetailCtrl', function ($scope, $ionicPopup,$stateParams, Record, back) {
  // $scope.rid = $stateParams.rid;
  // console.log($scope.rid)
  $scope.goback = back;
})
