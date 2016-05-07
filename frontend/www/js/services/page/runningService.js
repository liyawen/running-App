function random(left, right, isInt) {
    let size = right - left;
    let ret = Math.random() * size + left;
    if (isInt) {
        ret = parseInt(ret, 10);
    }
    return ret;
}
var fields = {
  distance: [0.001, 0.002],
  averagePace: [5, 10],
  averageCadence: [0.5, 3],
  fatigueIndex: [0.6, 1.0],
  healthIndex: [0.6, 1.0],
  landingStrike: [0, 3, true],
  landingPronation: [0, 3, true],
  landingPronationAngle: [-20, 20],
  impactPower: [100, 250],
  strideLength: [100, 170],
  xCOM: [0, 10],
  verticalMagnitude: [15, 20],
  energyUtilization: [0, 1],
  runTime: [0.005, 0.0083],
  calorie: [0, 50]
};
var map1 = ['frontHeelStrike','midFootStrike','backHeelStrike'];
var map2 = ['normalPronation','overPronation','underpronation'];
var curState = null;
var curRecordId = null;
var fatigueMap = null;

angular.module('starter.services')

.factory('Running', function ($http, $state, buildUrl, round) {
  return {
    getRecordId: function () {
      return curRecordId;
    },

    initial: function (callback) {
      curState = {
        averageCadence: 0,
        aveargePace: 0,
        distance: 0,
        runTime: 0,
        fatigueIndex: 1,
        fatigueIndexLast: 1,
        healthIndex: 1
      };
      fatigueMap = [];
      $http.get(buildUrl('/newRecord')).success(function (res) {
        curRecordId = res.id;
        callback();
      });
    },

    fatigueIndexLast: function (time) {
      var sum = 0;
      var count = 0;
      for (var i = fatigueMap.length - 1; i >= 0; i--) {
        if (time - fatigueMap[i].datatime > 5 * 60 * 1000) {
          break;
        }
        sum += fatigueMap[i].fatigueIndex;
        count += 1;
      }
      return sum / count;
    },

    getRandomData: function () {
      var row = {
        datatime: +(new Date())
      };
      Object.keys(fields).forEach(function (field) {
        row[field] = random.apply(null, fields[field]);
      });
      row.landingStrike = map1[row.landingStrike];
      row.landingPronation = map2[row.landingPronation];
      this.uploadData(row);

      var initialState = {
        averageCadence: row.averageCadence,
        averagePace: row.averagePace,
        distance: curState.distance + row.distance,
        runTime: curState.runTime + row.runTime,
        fatigueIndex: row.fatigueIndex,
        fatigueIndexLast: this.fatigueIndexLast(row.datatime),
        healthIndex: row.healthIndex
      };
      fatigueMap.push({
        datatime: row.datatime,
        fatigueIndex: row.fatigueIndex
      });
      curState = JSON.parse(JSON.stringify(initialState));

      ['averageCadence', 'averagePace', 'distance', 'runTime'].forEach(function (field) {
        initialState[field] = round(initialState[field], 2);
      });
      ['fatigueIndex', 'fatigueIndexLast', 'healthIndex'].forEach(function (field) {
        initialState[field] = round(initialState[field], 2, '%');
      });

      return initialState;
    },

    uploadData: function (data) {
      $http.post(buildUrl('/uploadData'), data);
    }
  };
})
