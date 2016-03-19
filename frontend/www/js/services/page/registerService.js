angular.module('starter.services')

.factory('Register', function ($http, $state ,$rootScope, $cookies, buildUrl) {
  var userMsg = [{
    name: '昵称',
    code: 'nickname'
  }, {
    name: '性别',
    code: 'gendle'
  }, {
    name: '年龄',
    code: 'ago'
  }, {
    name: '身高(cm)',
    code: 'height'
  }, {
    name: '体重(kg)',
    code: 'weight'
  }, {
    name: '鞋码',
    code: 'shoeSize'
  }, {
    name: '髋部高度(cm)',
    code: 'pelvisHeight'
  }, {
    name: '髋部宽度(cm)',
    code: 'pelvisWeight'
  }, {
    name: '膝盖高度(cm)',
    code: 'kneeHeight'
  }, {
    name: '膝盖宽度(cm)',
    code: 'kneeWeight'
  }, {
    name: '踝关节高度(cm)',
    code: 'ankleHeight'
  }, {
    name: '踝关节宽度(cm)',
    code: 'ankleWeight'
  }];
  userMsg.forEach(function (msg) {
    msg.value = '';
  });

  return {
    all: function () {
      return userMsg;
    },
    getAllMsg: function (scope, ionicPopup) {
      for (var i = 0; i < userMsg.length; i++) {
        if (userMsg[i].value == '') {
          ionicPopup.alert({
           title: userMsg[i].name + '没有填写！'
          });
        }
      }
      var params = {
        userMsg: userMsg,
        currentTid: $rootScope.currentTid
      }

      var userInfo = {};
      userMsg.forEach(function (item) {userInfo[item.code] = item.value});
      $rootScope.userInfo = userInfo;

      $http.post(buildUrl('/register'), params).success(function (res) {
        if (res.status == 0) {
          $rootScope.userInfo.email = res.email;
          $cookies.put('userInfo', JSON.stringify($rootScope.userInfo));
          scope.k = false;
          $state.go('homePage');
        } else {
          ionicPopup.alert({
               title: res.msg
            });
        }
      })
    }
  }
})
