angular.module('starter.controllers', ['starter.services'])

.controller('loginCtrl', function($scope, $http, login) {
	
	$scope.getUserName = login.getUserName($scope.userName);
})