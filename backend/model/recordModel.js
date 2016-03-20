'use strict';

const util = require('./util');
const db = require('./db');

class RecordModel {
  getRunRecords(req) {
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
  };

  getRunDetail(req) {
    let rid = req.query.rid;
    return Promise.resolve().then(() => {
      if (!/^\d+$/.test(rid)) {
        throw new Error('请求不合法');
      }
    }).then(() => {
      return db.query(`select count(1) as cnt from running_record where id = ${req.id} and rid = ${rid}`);
    }).then(res => {
      if (!res || res.length !== 1 || res[0].cnt !== 1) {
        throw new Error('无此纪录');
      }
    }).then(() => {
      let fields = [
        'sum(distance) as distance',
        'avg(averagePace) as averagePace',
        'avg(averageCadence) as averageCadence',
        'avg(fatigueIndex) as fatigueIndex',
        'avg(healthIndex) as healthIndex',
        'avg(landingPronationAngle) as landingPronationAngle',
        'avg(impactPower) as impactPower',
        'avg(strideLength) as strideLength',
        'avg(xCOM) as xCOM',
        'avg(verticalMagnitude) as verticalMagnitude',
        'avg(energyUtilization) as energyUtilization',
        'sum(runTime) as runTime',
        'sum(calorie) as calorie'
      ];
      let commonFields = [
        'landingStrike',
        'landingPronation'
      ];
      return Promise.all([
        db.query(`select ${fields.join(',')} from receive_data where rid = ${rid}`)
      ].concat(commonFields.map(field => {
        return db.query(`select ${field} from receive_data group by ${field} order by count(1) desc limit 1`);
      })));
    }).then(ress => {
      let res = ress.map(res => res[0]).reduce((p, cur) => {
        Object.keys(cur).map(key => p[key] = cur[key]);
        return p;
      }, {});
      Object.keys(res).map(key => {
        if (res[key] === null) {
          res[key] = 0;
        }
      });
      return res;
    }).catch(err => {
      return {
        states: 1,
        msg: err.message,
        sql: err.sql
      };
    });
  }
}

module.exports = RecordModel;
