'use strict';

let express = require('express');
let router = express.Router();
let UserModel = require('../model/userModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.post('/register/', function (req, res, next) {
  let model = new UserModel();
  model.register(req).then(function (result) {
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
