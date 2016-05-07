angular.module('starter.controllers')

.controller('recordDetailCtrl', function (
  $scope,
  $ionicPopup,
  $rootScope,
  $state,
  $stateParams,
  Record,
  RecordDetail,
  back,
  loadCookie,
  checkLogin
) {
  if (!checkLogin($state)) return;
  var rid = parseInt($stateParams.rid);
  var type = $stateParams.type;
  $scope.goback = back;
  Record.getDetail(rid, function (detail) {
    $scope.detail = detail;
  });

  RecordDetail.getChartData(rid, type, function (data) {
    $scope.data = data;
    if ($scope.data[0]) {
      $scope.labels = $scope.data[0].map(function (item) {
        return ' ';
      });
    }
  });
  $scope.options = {
    showTooltips: false,
    scaleShowGridLines: false,
    scaleShowHorizontalLines: false,
    scaleShowVerticalLines: false,
    pointDot : false
  };
  $scope.showTooltip = false;
})
