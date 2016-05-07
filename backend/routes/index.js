'use strict';

const express = require('express');
const router = express.Router();
const UserModel = require('../model/userModel');
const RecordModel = require('../model/recordModel');
const auth = require('../model/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

/* User Actions */
router.post('/login', function (req, res, next) {
  let model = new UserModel();
  model.login(req).then(result => {
    res.send(JSON.stringify(result));
  });
});

router.post('/cacheUser', function (req, res, next) {
  let model = new UserModel();
  model.cacheUser(req).then(result => {
    res.send(JSON.stringify(result));
  });
});

router.post('/register', function (req, res, next) {
  let model = new UserModel();
  model.register(req).then(result => {
    res.send(JSON.stringify(result));
  });
});

/* Record Actions */
router.get('/getRunRecords', function (req, res, next) {
  let model = new RecordModel();
  auth.access(req, res).then(() => {
    model.getRunRecords(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/getRunDetail', function (req, res, next) {
  let model = new RecordModel();
  auth.access(req, res).then(() => {
    model.getRunDetail(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/getChartData', function (req, res, next) {
  let model = new RecordModel();
  auth.access(req, res).then(() => {
    model.getChartData(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/modifyUserInfo', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new UserModel();
    model.modifyUserInfo(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

/* Running Actions */
router.get('/newRecord', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new RecordModel();
    model.createRecord(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/endRecord', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new RecordModel();
    model.endRecord(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

router.post('/uploadData', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new RecordModel();
    model.uploadData(req).then(result => {
      res.send(JSON.stringify(result));
    });
  });
});

module.exports = router;
