'use strict';

const util = require('./util');
const db = require('./db');

class UserModel {
  geneartePass(oriPass) {
    let salt = util.sha1((+new Date()).toString());
    let newPass = this.getPass(oriPass, salt);
    return {
      salt: salt,
      value: newPass
    };
  }

  getPass (password, salt) {
    let newPass = util.sha1(password + 'O_O' + salt);
    return  newPass;
  }

  validateForReg(req) {
    let userMsg = req.body.userMsg;
    let currentTid = req.body.currentTid;

    if (!currentTid) {
      return new Error('tid为空！');
    }
     return false;
  }

  validateForCache(req) {
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
      return new Error('密码只许为大小写字母或数字，长度6-20');
    }

    return false;
  }

  cacheUser(req) {
    let me = this;
    let email = req.body.email;
    let oriPass = req.body.password;

    let error = this.validateForCache(req);
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
      let newPass = me.generatePass(oriPass);
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
  }

  login(req) {
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

  register(req) {
    let me = this;
    let userMsg = req.body.userMsg;
    let currentTid = req.body.currentTid;

    let error = me.validateForReg(req);
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

  modifyUserInfo = function (req) {
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
}


module.exports = UserModel;
