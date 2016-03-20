angular.module('starter.controllers')

.controller('recordCtrl', function ($scope, $state, $stateParams, $rootScope, Record) {
  var rid = parseInt($stateParams.rid);
  Record.getDetail(rid, function (detail) {
    $scope.detail = detail;
    $rootScope.currentDetail = detail;
  });

  $scope.gotoChart = function (type) {
    $state.go('recordDetail', {
      type: type,
      rid: rid
    });
  }
});
