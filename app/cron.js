var r = require('../cron/redis');
var settings = require('./settings');

var payload;
var amazonLocale = {};

// settings.locales.forEach(function(el, index, array) {
//   amazonLocale[el] = require('./' + el);
// });

// Object.keys(amazonLocale).forEach(function(key, index, array) {
//   amazonLocale[key].ids.forEach(function(el, index, array) {

//     r.get('UK',function(err, reply) {
//       // value = JSON.parse(reply)
//       value = reply
//       console.log(value);
//     });

//   });
// });

var payloadUK;

r.get('UK',function(err, reply) {
  // value = JSON.parse(reply)
  value = reply
  console.log(value);
});