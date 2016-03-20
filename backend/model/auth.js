'use strict';

const db = require('./db');

function access(req, res) {
  return Promise.resolve().then(() => {
    let token = req.query.token;

    if (typeof token !== 'string' || !/^[a-f\d]{40}$/.test(token)) {
      throw new Error('缺少token字段或格式错误');
    }
    return db.query(`select * from user where sha1(salt) = '${token}'`);
  }).then(res => {
    if (!res || res.length < 1) {
      throw new Error('验证失败');
    }
    req.id = res[0].id;
  }).catch(e => {
    let result = {
      status: 1,
      msg: e.message,
      sql: e.sql
    };
    res.send(JSON.stringify(result));
  });
}

exports.access = access;
