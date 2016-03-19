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
.factory('loadCookie', function ($cookies, $rootScope) {
  return function () {
    if (!$rootScope.userInfo) {
      $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
    }
  }
})
