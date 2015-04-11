var _ = require('lodash');

exports.flattenJSON = function (payload) {
  return _.flatten(payload);
}

exports.bakeACake = function() {
  console.log('The cake is backing!');
}