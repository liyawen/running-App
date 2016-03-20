angular.module('starter.services')

.factory('homePage', function ($http, $rootScope, buildUrl) {
  return {
    getRunRecords: function (scope, ionicPopup, callback) {
      var userId = $rootScope.userInfo.id;
      $http.get(buildUrl('/getRunRecords', {userId: userId})).success(function (res) {
        if (res.status == 0) {
          res.records.forEach(function (item) {
            item.startTime = moment(new Date(item.startTime));
            item.endTime = moment(new Date(item.endTime));
          });
          callback(res.records);
        } else {
          ionicPopup.alert({
            title: res.msg
          });
        }
      })
    }
  }
});

