angular.module('starter.services')

.factory('HardwareConnect', function ($http, $state, buildUrl, round) {
  return {
  	tryConnect: function () {
  		return true;
  	}
  }
})