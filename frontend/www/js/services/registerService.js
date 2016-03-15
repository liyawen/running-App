angular.module('starter.services')

.factory('Register', function ($http, $state ,$rootScope) {
	var userMsg = [{
		name: '昵称',
		value: ''
	}, {
		name: '性别',
		value: ''
	}, {
		name: '年龄',
		value: ''
	}, {
		name: '身高(cm)',
		value: ''
	}, {
		name: '体重(kg)',
		value: ''
	}, {
		name: '鞋码',
		value: ''
	}, {
		name: '髋部高度(cm)',
		value: ''
	}, {
		name: '髋部宽度(cm)',
		value: ''
	}, {
		name: '膝盖高度(cm)',
		value: ''
	}, {
		name: '膝盖宽度(cm)',
		value: ''
	}, {
		name: '踝关节高度(cm)',
		value: ''
	}, {
		name: '踝关节宽度(cm)',
		value: ''
	}];

	return {
		all: function () {
			return userMsg;
		},
		getAllMsg: function (scope) {
			for (var i = 0; i < userMsg.length; i++) {
				if (userMsg[i].value == '') {
					alert(userMsg[i].name + '没有填写！')
				}
			}
			var params = {
				userMsg: userMsg,
				currentTid: $rootScope.currentTid
			}
			$http.post('http://localhost:3000/register/', params).success(function (res) {
				console.log(res);
			})
		}
	}
})