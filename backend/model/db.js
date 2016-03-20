'use strict';

let mysql = require('mysql');
let config = require('../config/db');
let connection = mysql.createConnection(config);

connection.connect();

exports.query = function (sql) {
  return new Promise(function (resolve, reject) {
    let query = connection.query(sql, function (err, rows) {
      if (err) {
        err.sql = query.sql;
        reject(err);
      } else {
        rows.sql = query.sql;
        resolve(rows);
      }
    });
  });
};

exports.end = function () {
  connection.end();
};
