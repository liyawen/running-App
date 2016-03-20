angular.module('starter.controllers')

.controller('recordCtrl', function ($scope, $state, $stateParams, Record) {
  let rid = parseInt($stateParams.rid);
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
