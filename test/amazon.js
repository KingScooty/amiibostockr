var assert = require("assert"); // node.js core module

var _ = require('lodash');

var amazon = require('../cron/amazon').amazon;
var amazon_functions = require('../cron/amazon').functions;

var flattenJSON = require('../cron/utils').flattenJSON;
var productsInStock = require('../cron/utils').productsInStock;

var payload = require('./fixtures/payload_grouped');
var payload2 = require('./fixtures/payload_final');
var inStock = require('./fixtures/inStock');

describe('Amazon', function() {
  describe('#updateStock', function() {
     it('should truthy all the ASIN ids that are in stock', function() {
      amazon_functions.updateStock('UK', payload2)
      assert.deepEqual(inStock, amazon.locale.UK.ASIN);
     });
  });
});