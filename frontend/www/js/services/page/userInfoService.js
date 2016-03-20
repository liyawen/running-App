angular.module('starter.services')

.factory('UserInfo', function ($http, $state, $rootScope, $cookies, $timeout, buildUrl) {
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
  return {
    getMsg: function () {
      var userInfo = $rootScope.userInfo;
      Object.keys(userInfo).forEach(function (key) {
        for (var i = 0; i < userMsg.length; i++) {
          if (userMsg[i].code === key) {
            userMsg[i].value = userInfo[key];
          }
        }
      });
      return userMsg;
    },
    show: function (x, scope, ionicPopup) {
      var me = this;
      scope.currentValue = {};
      scope.currentValue.value = x.value;

       // An elaborate, custom popup
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
              $http.get(buildUrl('/modifyUserInfo', {code: x.code, value: scope.currentValue.value})).success(function (res) {
                if (res.status != 0) {
                  ionicPopup.alert({
                    title: '修改失败' + res.msg
                  });
                } else {
                  // $rootScope.userInfo = res.userInfo;
                  
                  $rootScope.userInfo = res.userInfo;
                  $cookies.put('userInfo', JSON.stringify($rootScope.userInfo));
                  scope.userArray = me.getMsg();
                }
              })
            } else {
              e.preventDefault();
            }
          }
        }]
      });
      $timeout(function() {
        myPopup.close(); 
      }, 20000);
    }
  }
})
