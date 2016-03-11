angular.module('starter.services', [])

.factory('login', function ($scope) {
	return {
		getUserName: function (userName) {
			if (userName == '00') {
				console.log($scope.userName)
				alert("yeyeyeye");
			}
		}
	}
});