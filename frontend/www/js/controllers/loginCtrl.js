angular.module('starter.controllers')

.controller('loginCtrl', function($scope, $state, Login) {
    // $scope.getUserName = function () {
    //  login.getUser($scope);
    // }
    
    $scope.sendUserMsg = function () {
        Login.sendUserMsg($scope);
    }

    // $scope.register = function () {
    //     $scope.confirmPassword.
    // }
    $scope.jumpRegister = function () {
        Login.jumpRegister($scope);
        
    }
    

})