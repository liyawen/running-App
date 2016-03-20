'use strict';

let express = require('express');
let router = express.Router();
let UserTmpModel = require('../model/userTmpModel');
let UserModel = require('../model/userModel');
let UserLoginModel = require('../model/userLoginModel');
let RecordModel = require('../model/recordModel');
let auth = require('../model/auth');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/userTmp', function (req, res, next) {
  let model = new UserTmpModel();
  model.register(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

router.post('/register', function (req, res, next) {
  let model = new UserModel();
  model.register(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

router.post('/login', function (req, res, next) {
  let model = new UserLoginModel();
  model.login(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

router.get('/getRunRecords', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new RecordModel();
    model.getRunRecords(req).then(function (result) {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/getRunDetail', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new RecordModel();
    model.getRunDetail(req).then(function (result) {
      res.send(JSON.stringify(result));
    });
  });
});

router.get('/modifyUserInfo', function (req, res, next) {
  auth.access(req, res).then(() => {
    let model = new UserModel();
    model.modifyUserInfo(req).then(function (result) {
      res.send(JSON.stringify(result));
    }); 
  });
});

module.exports = router;
