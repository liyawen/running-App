angular.module('starter.services')

.factory('currentHost', function () {
  return '115.28.105.173:3000';
  // return '127.0.0.1:3000';
})

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

.factory('checkLogin', function ($cookies, $rootScope) {
  return function ($state) {
    if (!$rootScope.userInfo) {
      if ($cookies.get('userInfo')) {
        $rootScope.userInfo = JSON.parse($cookies.get('userInfo'));
      } else {
        $state.go('login');
        return false;
      }
    }
    return true;
  };
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

.factory('back', function ($window, $state) {
  return function (state, params) {
    if (state) {
      $state.go(state);
    } else {
      $window.history.back();
    }
  };
})

.factory('buildUrl', function (currentHost, $rootScope, $cookies, loadCookie) {
  return function (url, params) {
    if (!params) {
      params = {};
    }
    loadCookie();
    if (!params.token && $rootScope.userInfo && $rootScope.userInfo.token) {
      params.token = $rootScope.userInfo.token;
    }

    if (url.slice(-1) === '/') {
      url = url.slice(0, -1);
    }
    url = 'http://' + currentHost + url;
    if (Object.keys(params).length) {
      url += '?' + Object.keys(params).map(function (param) {
        return param + '=' + params[param]
      }).join('&');
    }
    return url;
  };
})

.factory('round', function () {
  return function (num, digit, unit) {
    num = parseFloat(num);
    if (isNaN(num)) {
      return '-';
    }
    if (unit === '%') {
      num *= 100;
    }
    digit = digit || 0;
    num = num.toFixed(digit).toString();
    if (unit) {
      num += unit;
    }
    return num;
  }
});
