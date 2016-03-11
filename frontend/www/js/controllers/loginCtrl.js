angular.module('starter.controllers', ['starter.services'])

.controller('loginCtrl', function($scope, $http, login) {
	// $scope.getUserName = function () {
	// 	login.getUser($scope);
	// }
	var params = {
		username: $scope.userName,
		password: $scope.password
	}
	$http.post('localhost:3000/register/', params).success(function (res) {
		alert(res.msg);
	})

})