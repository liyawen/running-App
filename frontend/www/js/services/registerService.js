angular.module('starter.services')

.factory('Register', function ($http, $state ,$rootScope, $cookies) {
	var userMsg = [{
		name: '昵称',
		code: 'nickname',
		value: ''
	}, {
		name: '性别',
		code: 'gendle',
		value: ''
	}, {
		name: '年龄',
		code: 'ago',
		value: ''
	}, {
		name: '身高(cm)',
		code: 'height',
		value: ''
	}, {
		name: '体重(kg)',
		code: 'weight',
		value: ''
	}, {
		name: '鞋码',
		code: 'shoeSize',
		value: ''
	}, {
		name: '髋部高度(cm)',
		code: 'pelvisHeight',
		value: ''
	}, {
		name: '髋部宽度(cm)',
		code: 'pelvisWeight',
		value: ''
	}, {
		name: '膝盖高度(cm)',
		code: 'kneeHeight',
		value: ''
	}, {
		name: '膝盖宽度(cm)',
		code: 'kneeWeight',
		value: ''
	}, {
		name: '踝关节高度(cm)',
		code: 'ankleHeight',
		value: ''
	}, {
		name: '踝关节宽度(cm)',
		code: 'ankleWeight',
		value: ''
	}];

JSON.stringify()

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

			let userInfo = {};
			userMsg.forEach(item => {userInfo[item.code] = item.value});
			$rootScope.userInfo = userInfo;

			$http.post('http://localhost:3000/register/', params).success(function (res) {
				if (res.status == 0) {
					$rootScope.userInfo.email = res.email;
					$cookies.put('userInfo', JSON.stringify($rootScope.userInfo));
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