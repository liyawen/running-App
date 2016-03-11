angular.module('starter.services', [])

.factory('login', function () {
	return {
		getUser: function (scope) {
			console.log(scope.userName);
			
		}
	}
});