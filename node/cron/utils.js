'use strict';

var _ = require('lodash');
var diff = require('deep-diff').diff;

exports.flattenJSON = function flattenJSON(payload) {
  return _.flatten(payload);
};

exports.determineHost = function determineHost() {
  var host;
  if (process.env.NODE_ENV === 'production') {
    host = 'redis';
  } else {
    // host: 'amiibostockr_redis_1',
    host = 'localhost';
  }
  return host;
};

/**
 EXAMPLE RESPONSE:

[ { kind: 'D', path: [ 'UK', 'B00N8PBGV6' ], lhs: true },
  { kind: 'D', path: [ 'UK', 'B00QGBNLU8' ], lhs: true },
  { kind: 'N', path: [ 'UK', 'B00Q6A571A' ], rhs: true },
  { kind: 'D', path: [ 'US', 'B00O97ZWVC' ], lhs: true } ]

*/

exports.diffTable = function diffTable(lhs, rhs) {
  return diff(lhs, rhs);
};
