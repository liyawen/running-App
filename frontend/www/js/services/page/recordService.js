angular.module('starter.services')

.factory('Record', function ($http, $state, buildUrl, round) {
  return {
    getDetail: function (rid, callback) {
      $http.get(buildUrl('/getRunDetail', {rid: rid})).success(function (res) {
        var format = {
          fatigueIndex: [0, '%'],
          healthIndex: [0, '%'],
          landingStrike: {
            'frontHeelStrike': 'Front',
            'midFootStrike': 'Mid',
            'backHeelStrike': 'Back'
          },
          landingPronationAngle: [1],
          impactPower: [0],
          strideLength: [0],
          xCOM: [0],
          verticalMagnitude: [0],
          averageCadence: [0],
          averagePace: [1],
          distance: [1],
          runTime: [0]
        };
        Object.keys(format).forEach(function (key) {
          if (res[key] == null) {
            return;
          }
          if (format[key] instanceof Array) {
            res[key] = round.apply(null, [res[key]].concat(format[key]));
          } else if (typeof format === 'object') {
            res[key] = format[key][res[key]];
          }
        });
        callback(res);
      });
    }
  };
})
