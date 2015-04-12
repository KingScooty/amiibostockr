var express = require('express');
var router = express.Router();
var util = require('util');
var r = require('../cron/redis');

r.get('UK', function(err, reply) {
  console.log(util.inspect(JSON.parse(reply), {showHidden: false, depth: null}));
  // value = JSON.parse(reply);
  value = reply;
});

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { 
    title: 'Express',
    value: value 
  });
});

module.exports = router;
