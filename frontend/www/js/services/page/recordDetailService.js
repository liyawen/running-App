angular.module('starter.services')

.factory('RecordDetail', function ($http, $state, buildUrl, $cookies) {
  return {
    getChartData: function (rid, type, callback) {
      $http.get(buildUrl('/getChartData', {rid: rid, type: type})).success(function (res) {
        callback([res]);
      });
    }
  };
})
