var express = require('express');
var router = express.Router();

/* GET users listing. */

// post localhost/register/yedeying?name=yedeying&password=xxx
// content photo png

router.get('/', function(req, res, next) {
  // req.param
  //    {user: yedeying}
  // req.query
  //    {name: yedeying, password: xxx}
  // req.body
  //    {photo: xx.png}
  res.send('respond with a resource');
});

module.exports = router;
