var assert = require("chai").assert;
var _ = require('lodash');

var utils = require('../cron/utils');
var stockTable = require('./fixtures/stockTable');
var stockTable_modified = require('./fixtures/stockTable_modified');


describe('Utils', function() {
  describe('#diffTable()', function() {
    it('should show the difference between 2 objects', function() {
      // console.log(utils.diffTable(stockTable, stockTable_modified));
    });
  })

});
