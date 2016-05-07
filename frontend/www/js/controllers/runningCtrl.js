angular.module('starter.controllers')

.controller('runningCtrl', function ($scope, $state, $stateParams, Running, back) {
  $scope.goback = back;
  var initialState = {
    averageCadence: '0',
    averagePace: '0',
    distance: '0',
    runTime: '0',
    fatigueIndex: '--',
    fatigueIndexLast: '--',
    healthIndex: '--'
  };
  var currentState = false;
  var interval = null;
  $scope.data = initialState;
  $scope.actionName = 'Start';

  var updateData = function () {
    $scope.data = Running.getRandomData($scope.data);
  }

  $scope.toggle = function () {
    currentState = !currentState;
    if (currentState) {
      interval = setInterval(function () {
        $scope.$apply(updateData);
      }, 500);
      $scope.actionName = 'Stop';
    } else {
      if (interval) {
        clearInterval(interval);
      }
      $scope.actionName = 'Start';
    }
  };
});
