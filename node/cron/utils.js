var _ = require('lodash');
var diff = require('deep-diff').diff;

exports.flattenJSON = function (payload) {
  return _.flatten(payload);
}

/**
 EXAMPLE RESPONSE:

[ { kind: 'D', path: [ 'UK', 'B00N8PBGV6' ], lhs: true },
  { kind: 'D', path: [ 'UK', 'B00QGBNLU8' ], lhs: true },
  { kind: 'N', path: [ 'UK', 'B00Q6A571A' ], rhs: true },
  { kind: 'D', path: [ 'US', 'B00O97ZWVC' ], lhs: true } ]

*/

exports.diffTable = function (lhs, rhs) {
 return diff(lhs, rhs);
}