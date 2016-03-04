'use strict';

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'aA19940121',
  database : 'sport'
});

connection.connect();

exports.query =function (sql) {
	return new Promise(function (resolve, reject) {
		connection.query(sql, function (err, rows, fields) {
			if (err) {
				reject(err);
			} else {
				resolve(rows);
			}
		});
	});
};

exports.end = function () {
	connection.end();
};