var assert = require("assert"); // node.js core module

var _ = require('lodash');

var amazon = require('../cron/amazon').amazon;
var amazon_functions = require('../cron/amazon').functions;

var flattenJSON = require('../cron/utils').flattenJSON;
var productsInStock = require('../cron/utils').productsInStock;

var payloadUK = require('./fixtures/payload_grouped_UK');
var payload2UK = require('./fixtures/payload_final_UK');
var payload2US = require('./fixtures/payload_final_US');
var inStockUK = require('./fixtures/inStock_UK');
var inStockUS = require('./fixtures/inStock_US');

describe('Amazon', function() {
  describe('#updateStock', function() {
     it('should truthy all the ASIN ids that are in stock', function() {
      amazon_functions.updateStock('UK', payload2UK);
      amazon_functions.updateStock('US', payload2US);
      assert.deepEqual(inStockUK, amazon.locale.UK.ASIN);
      assert.deepEqual(inStockUS, amazon.locale.US.ASIN);
     });
  });
});