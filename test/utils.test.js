var assert = require("assert"); // node.js core module

var _ = require('lodash');
var flattenJSON = require('../cron/utils').flattenJSON;
var productsInStock = require('../cron/utils').productsInStock;
var payload = require('./fixtures/payload_grouped_UK');
var payload2 = require('./fixtures/payload_final_UK');

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
      assert.equal(10, productsInStock(payload2).length);
    });
  });

});