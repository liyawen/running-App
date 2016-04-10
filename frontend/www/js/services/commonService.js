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
    var checkCookie = function (key) {
      if (!$rootScope[key]) {
        var val = $cookies.get(key);
        if (val) {
          $rootScope[key] = JSON.parse($cookies.get(key));
        }
      }
    };
    checkCookie('userInfo');
  }
})
.factory('back', function ($window) {
  return function () {
    $window.history.back();
  };
})
