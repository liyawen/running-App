angular.module('starter.controllers', ['starter.services'])

.controller('loginCtrl', function($scope, $http, $state, login) {
	// $scope.getUserName = function () {
	// 	login.getUser($scope);
	// }
	
	$scope.sendUserMsg = function () {
		var params = {
			username: $scope.userName,
			password: $scope.password
		}
		$http.post('http://localhost:3000/register/', params).success(function (res) {
			alert(res.msg);
		})
	}

	$scope.jumpRegister = function () {
		$state.go('register');
	}
	

})