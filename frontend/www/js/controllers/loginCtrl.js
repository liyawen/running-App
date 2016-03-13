angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $state, login) {
    // $scope.getUserName = function () {
    //  login.getUser($scope);
    // }
    
    $scope.sendUserMsg = function () {
        login.sendUserMsg($scope);
    }

    // $scope.register = function () {
    //     $scope.confirmPassword.
    // }
    $scope.jumpRegister = function () {
        $state.go('register');
    }
    

})