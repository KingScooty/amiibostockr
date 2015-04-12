var assert = require("assert"); // node.js core module

var _ = require('lodash');

var amazon = require('../cron/amazon').amazon;
var amazon_functions = require('../cron/amazon').functions;
var flattenJSON = require('../cron/utils').flattenJSON;
var productsInStock = require('../cron/utils').productsInStock;
var resetStockValues = require('../cron/utils').resetStockValues;

var payload = require('./fixtures/payload_grouped_UK');
var payload2UK = require('./fixtures/payload_final_UK');

var inStock = require('./fixtures/inStock_UK');


describe('Utils', function() {
  describe('#flattenJSON()', function() {
    
    before(function(){
      assert.equal(4, payload.length);
    })

    it('should flatten array chunks into one object', function() {
      // assert.notEqual(4, _.flatten(payload).length);
      // assert.equal(35, _.flatten(payload).length);
      assert.notEqual(flattenJSON(payload).length, 4);
      assert.equal(flattenJSON(payload).length, 35);
    })

  })

  describe('#productInStock', function() {
    it('should filter the ASIN ids that are in stock', function() {
      assert.equal(10, productsInStock(payload2UK).length);
    });
  });

  describe('#resetStockValues', function() {
    it('should reset all stock values to false', function() {
      var ASIN = amazon.locale.UK.ASIN;

      function checkAllFalse() {
        return _.every(_.values(ASIN), function(v) {return !v;});        
      }

      assert.equal(checkAllFalse(), true);

      amazon_functions.updateStock('UK', payload2UK);
      assert.equal(checkAllFalse(), false);

      resetStockValues(ASIN);
      assert.equal(checkAllFalse(), true);

    });
  });

});