angular.module('starter.controllers')

.controller('recordCtrl', function ($scope, $ionicPopup, $stateParams, Record) {
  let rid = parseInt($stateParams.rid);
  Record.getDetail(rid, function (detail) {
    $scope.detail = detail;
  });
});
