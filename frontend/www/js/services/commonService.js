angular.module('starter.services')

.factory('commonService', function ($cookies, $rootScope, $state) {
  return {
    confirmLogin: function () {
      if ($cookies.get('userInfo')) {
        $state.go('homePage');
      } else {
        $state.go('login');
      }
    }
  }
})
