angular.module('starter.controllers')

.controller('recordCtrl', function ($scope, $state, $stateParams, $rootScope, Record, back) {
  var rid = parseInt($stateParams.rid);
  $scope.goback = back;
  Record.getDetail(rid, function (detail) {
    $scope.detail = detail;
  });

  $scope.gotoChart = function (type) {
    $state.go('recordDetail', {
      type: type,
      rid: rid
    });
  }
});
