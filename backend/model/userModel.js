'use strict';
let util = require('./util');
let db = require('./db');

function UserModel() {
  this.defaultName = 'ye';
}

UserModel.prototype.validate = function (req) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username) {
    return new Error('用户名不能为空');
  }
  if (!password) {
    return new Error('密码不能为空');
  }
  if (!/^[a-zA-Z0-9]{8,20}$/.test(username)) {
    return new Error('用户名只许为大小写字母或数字，长度8-20');
  }
  if (!/^[a-zA-Z0-9]{8,20}$/.test(password)) {
    return new Error('密码只许为大小写字母或数字，长度8-20');
  }

  return false;
};

UserModel.prototype.register = function (req) {
  let me = this;
  let username = req.body.username;
  let oriPass = req.body.password;

  let error = this.validate(req);
  if (error) {
    return Promise.resolve({
      status: 1,
      msg: error.message
    });
  }

  // 231242353534
  // salt = sha1(+new Date())
  // password = sha1(password + salt)
  // salt  password

  return db.query(`select * from user where username = '${username}'`).then(function (res) {
    if (res.length > 0) {
      throw new Error('该用户已存在');
    }
    return 1;
  }).then(function () {
    let newPass = me.getPassword(oriPass);
    return db.query(`
      insert into user (username, password, salt) values
      ('${username}', '${newPass.value}', '${newPass.salt}')
    `);
  }).then(function () {
    return {
      status: 0,
      msg: '插入成功'
    };
  }).catch(function (err) {
    return {
      status: 1,
      msg: err.message,
      sql: err.sql
    };
  });
};

UserModel.prototype.getPassword = function (oriPass) {
  let salt = util.sha1((+new Date()).toString());
  let newPass = util.sha1(oriPass + 'O_O' + salt);
  return {
    salt: salt,
    value: newPass
  };
};

module.exports = UserModel;
