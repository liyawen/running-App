'use strict';

var db = require('./db');


function UserModel() {
	this.defaultName = 'ye';
}

UserModel.prototype.register = function (req, callback) {
	let username = req.params.name;
	let password = req.params.password;

	return db.query(`select * from users where username = ${username}`).then(function (res) {
		if (res.length > 0) {
			throw new Error('该用户已存在');
		}
		return 1;
	}).then(function (x) {
		return db.query(`insert into users (username, password) values ('${username}', '${password}')`)
	}).then(functxion () {
		return {
			status: 0,
			msg: '插入成功'
		}
	}).catch(function (err) {
		return {
			status: 1,
			msg: err.message
		};
	});
};

module.exports = UserModel;