angular.module('starter.services', [])

.factory('login', function ($http) {
	return {
		getUser: function (scope) {
			console.log(scope.userName);
			
		},

		sendUserMsg: function (scope) {
			var params = {
				username: scope.userName,
				password: scope.password
			}
			$http.post('http://localhost:3000/register/', params).success(function (res) {
				alert(res.msg);
			})
		}
	}
});