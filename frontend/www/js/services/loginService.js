angular.module('starter.services')

.factory('Login', function ($http, $state, $rootScope) {
	return {

		sendUserMsg: function (scope) {
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
			} else if (!/^[a-zA-Z0-9]{6,20}$/.test(params.password)) {
			    alert("密码只许为大小写字母或数字，长度6-20！");
				scope.password = '';
			} else {
				$http.post('http://localhost:3000/login/', params).success(function (res) {
					if (res.status == 0) {
						alert("登陆成功！");
					} else {
						alert(res.msg);
					}
				})
			}
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
			} else if (!(/^[a-zA-Z0-9]{6,20}$/.test(params.password) || /^[a-zA-Z0-9]{6,20}$/.test(scope.confirmPassword))) {
			    alert("密码只许为大小写字母或数字，长度6-20！");
				scope.password = '';
				scope.confirmPassword = '';
			} else if (params.password != scope.confirmPassword) {
				alert("两次输入的密码不相同，请重新输入！");
				scope.password = '';
				scope.confirmPassword = '';
			} else {
				$http.post('http://localhost:3000/userTmp/', params).success(function (res) {
					if (res.status == 0) {
						$rootScope.currentTid = res.tid;
						$state.go('register');
					} else {
						alert(res.msg);
					}
				})
			}
			
		}
	}
});