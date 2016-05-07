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
    code: 'age'
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
    code: 'pelvisWidth'
  }, {
    name: '膝盖高度(cm)',
    code: 'kneeHeight'
  }, {
    name: '膝盖宽度(cm)',
    code: 'kneeWidth'
  }, {
    name: '踝关节高度(cm)',
    code: 'ankleHeight'
  }, {
    name: '踝关节宽度(cm)',
    code: 'ankleWidth'
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
        if (userMsg[i].name != '性别' && userMsg[i].value == '') {
          ionicPopup.alert({
           title: userMsg[i].name + '没有填写！'
          });
          return false;
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
          $rootScope.userInfo.token = res.token;
          $rootScope.userInfo.userId = res.userId;
          $cookies.put('userInfo', JSON.stringify($rootScope.userInfo));
          scope.k = false;
          $state.go('homePage');
        } else {
          ionicPopup.alert({
            title: res.msg
          });
        }
      })
    },
    show: function (x, scope, ionicPopup) {
      scope.currentValue = {};
      scope.currentValue.value = x.value;
       var myPopup = ionicPopup.show({
        template: '<input type="text" style="padding-left: 20px;" ng-model="currentValue.value" />',
        title: x.name,
        scope: scope,
        buttons: [{
          text: '取消'
        }, {
          text: '<b>确定</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (scope.currentValue.value != x.value) {
              x.value = scope.currentValue.value;
            } else {
              e.preventDefault();
            }
          }
        }]
      });

    }
  }
})
