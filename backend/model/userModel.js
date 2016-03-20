'use strict';
let util = require('./util');
let db = require('./db');

function UserModel () {

}

UserModel.prototype.validate = function (req) {
  let userMsg = req.body.userMsg;
  let currentTid = req.body.currentTid;

  if (!currentTid) {
    return new Error('tid为空！');
  }
   return false;
}

UserModel.prototype.register = function (req) {
  let me = this;
  let userMsg = req.body.userMsg;
  let currentTid = req.body.currentTid;

  let error = me.validate(req);
  if (error) {
    return Promise.resolve({
      status: 1,
      msg: error.message
    });
  }
  let email = '';

  return db.query(`select * from user_tmp where id = '${currentTid}'`).then(function (res) {
    if (res.length <= 0) {
      return new Error('不存在该用户！');
    } else {
      email = res[0].email;
      let sql = `insert into user (email, password, nickname, gendle, age, 
        height, weight, shoeSize, pelvisHeight, pelvisWidth, KneeHeight, KneeWidth, 
        AnkleHeight, AnkleWidth, salt) VALUES ('${res[0].email}','${res[0].password}','${userMsg[0].value}',
        '${userMsg[1].value}','${userMsg[2].value}','${userMsg[3].value}','${userMsg[4].value}','${userMsg[5].value}','${userMsg[6].value}',
        '${userMsg[7].value}','${userMsg[8].value}','${userMsg[9].value}','${userMsg[10].value}','${userMsg[11].value}','${res[0].salt}')`;
      return db.query(sql);
    }
  }).then(function (res) {
    return {
      status: 0,
      email: email,
      msg: '插入成功'
    };
  }).catch(function (err) {
    return {
      status: 1,
      msg: err.message,
      sql: err.sql
    };
  });
}

UserModel.prototype.modifyUserInfo = function (req) {
  let me = this;
  let code = req.query.code;
  let value = req.query.value;
  let id = req.id;

  return db.query(`update user set ${code} = '${value}' where id = '${id}'`).then(function (res) {
    console.log(res);
    if (res.affectedRows <= 0) {
      return new Error('插入失败！');
    } else {
      return db.query(`select * from user where id = '${id}'`)
    }
  }).then(function (res) {
    res[0].token = util.sha1(res[0].salt);
    res[0].salt = undefined;
    res[0].password = undefined;
    return {
      status: 0,
      userInfo: res[0],
      msg: '修改成功！'
    };
  }).catch(function (err) {
    return {
      status: 1,
      msg: err.message,
      sql: err.sql
    };
  });
}

module.exports = UserModel;
