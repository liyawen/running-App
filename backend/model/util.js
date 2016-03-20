'use strict';

const crypto = require('crypto');

function sha1(value) {
  let sha1 = crypto.createHash('sha1');
  sha1.update(value);
  return sha1.digest('hex');
}

exports.sha1 = sha1;
