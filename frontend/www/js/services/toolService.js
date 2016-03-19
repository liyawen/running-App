angular.module('starter.services')

.factory('currentHost', function () {
  return '127.0.0.1:3000';
})
.factory('buildUrl', function (currentHost) {
  return function (url, params) {
    if (url.slice(-1) === '/') {
      url = url.slice(0, -1);
    }
    url = 'http://' + currentHost + url + '?';
    if (params) {
      url += Object.keys(params).map(function (param) {
        return param + '=' + params[param]
      }).join('&');
    }
    return url;
  };
});
