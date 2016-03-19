'use strict';
let util = require('./util');
let db = require('./db');

function UserLoginModel () {

}

UserLoginModel.prototype.getPassword = function (password, salt) {
  let newPass = util.sha1(password + 'O_O' + salt);
  return  newPass;
}

UserLoginModel.prototype.login = function (req) {
  let me = this;
  let email = req.body.email;
  let password = req.body.password;

  return db.query(`select * from user where email = '${email}'`).then(function (res) {
    if (res <= 0) {
      return {
        status: -1,
        msg: '该用户不存在！'
      }
    } else {
      let newPass = me.getPassword(password, res[0].salt);
      if (newPass == res[0].password) {
        res[0].token = util.sha1(res[0].salt);
        res[0].password = undefined;
        res[0].salt = undefined;
        return {
          status: 0,
          userInfo: res[0],
          msg: '登陆成功！'
        };
      } else {
        return {
          status: -2,
          msg: '密码错误！'
        };
      }
    }
  }).catch(function (err) {
    return {
      status: 1,
      msg: err.message,
      sql: err.sql
    };
  });
}

module.exports = UserLoginModel;
