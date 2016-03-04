var express = require('express');
var router = express.Router();
var UserModel = require('../model/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register/:user/', function (req, res, next) {
  var model = new UserModel();
  // 1. callback   2. Promise
  model.register(req).then(function (result) {
  	res.send(JSON.stringify(result));
  });
});

module.exports = router;
