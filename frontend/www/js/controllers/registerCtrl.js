angular.module('starter.controllers')

.controller('registerCtrl', function ($scope, Register) {
	$scope.userMsg = Register.all();
	$scope.getAllMsg = function () {
		Register.getAllMsg($scope);
	}
})