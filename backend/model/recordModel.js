'use strict';
let util = require('./util');
let db = require('./db');

function RecordModel() {

}

RecordModel.prototype.getRunRecords = function (req) {
  let userId = req.query.userId;
  return db.query(`select * from running_record where id = '${userId}'`).then(function (res) {
    if (res.length <= 0) {
      throw new Error('该用户没有运动记录！');
    } else {
      res.forEach(function (row) {
        row.startTime = row.startTime - 0;
        row.endTime = row.endTime - 0;
      })
      return {
        status: 0,
        msg: '查询成功！',
        records: res
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

module.exports = RecordModel;
