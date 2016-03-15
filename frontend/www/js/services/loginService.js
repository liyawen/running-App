angular.module('starter.services')

.factory('Login', function ($http, $state, $rootScope) {
	return {

		sendUserMsg: function (scope) {
			var params = {
				username: scope.email,
				password: scope.password
			}
			$http.post('http://localhost:3000/register/', params).success(function (res) {
				alert(res.msg);
			})
		},
		jumpRegister: function (scope) {
			var params = {
				email: scope.email,
				password: scope.password
			}
			if (!params.email) {
				alert("邮箱不能为空！");
			} else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(params.email)) {
				alert("输入的邮箱格式不正确，请输入正确的邮箱！");
			} else if (!params.password) {
				alert("密码不能为空！");
			} else if(!scope.confirmPassword) {
				alert("确认密码不能为空！");
			} else if (params.password != scope.confirmPassword) {
				alert("两次输入的密码不相同，请重新输入！");
				scope.password = '';
				scope.confirmPassword = '';
			} else {
				$http.post('http://localhost:3000/userTmp/', params).success(function (res) {
					if (res.status == 0) {
						$rootScope.currentTid = res.tid;
						console.log($rootScope.currentTid)
						$state.go('register');
					}
				})
			}
			
		}
	}
});