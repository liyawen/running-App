angular.module('starter.controllers')

.controller('homePageCtrl', function($scope, $state, $ionicPopup, $cookies, $rootScope, $ionicSideMenuDelegate, homePage) {
	if ($rootScope.userInfo) {
		$scope.nickname = $rootScope.userInfo.nickname;
	} else {
		$rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
		$scope.nickname = $rootScope.userInfo.nickname;
	}
	
    homePage.getRunRecords($scope, $ionicPopup, function (records) {
    	$scope.runRecords = records;
    	console.log(records);
    });
    
    $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

})