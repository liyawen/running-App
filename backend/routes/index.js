'use strict';

let express = require('express');
let router = express.Router();
let userTmpModel = require('../model/userTmpModel');
let userModel = require('../model/userModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/userTmp/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  let model = new userTmpModel();
  model.register(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

router.post('/register/', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  let model = new userModel();
  model.register(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
