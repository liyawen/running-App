'use strict';
let util = require('./util');
let db = require('./db');

function UserTmpModel() {
  this.defaultName = 'ye';
}

UserTmpModel.prototype.validate = function (req) {
  let email = req.body.email;
  let password = req.body.password;
  if (!email) {
    return new Error('邮箱不能为空');
  }
  if (!password) {
    return new Error('密码不能为空');
  }
  if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
    return new Error('邮箱格式错误');
  }
  if (!/^[a-zA-Z0-9]{6,20}$/.test(password)) {
    return new Error('密码只许为大小写字母或数字，长度8-20');
  }

  return false;
};

UserTmpModel.prototype.register = function (req) {
  let me = this;
  let email = req.body.email;
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

  return db.query(`select * from user where email = '${email}'`).then(function (res) {
    if (res.length > 0) {
      throw new Error('该用户已存在');
    }
    return 1;
  }).then(function () {
    let newPass = me.getPassword(oriPass);
    let sql = `replace into user_tmp (email, password, salt) values
      ('${email}', '${newPass.value}', '${newPass.salt}')`;
    return db.query(sql);
  }).then(function (res) {
    console.log(res);
    return {
      status: 0,
      msg: '插入成功',
      tid: res.insertId
    };
  }).catch(function (err) {
    return {
      status: 1,
      msg: err.message,
      sql: err.sql
    };
  });
};

UserTmpModel.prototype.getPassword = function (oriPass) {
  let salt = util.sha1((+new Date()).toString());
  let newPass = util.sha1(oriPass + 'O_O' + salt);
  return {
    salt: salt,
    value: newPass
  };
};

module.exports = UserTmpModel;
