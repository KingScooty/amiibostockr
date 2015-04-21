'use strict';
var assert = require('chai').assert;
// var assert = require("assert");

var _ = require('lodash');
// var O = require('observed');
var sinon = require('sinon');

/**
 * Dependencies
 */

var amazon = require('../cron/amazon');

/**
 * Fixtures
 */

var amazon_response_UK = require('./fixtures/amazon_response_UK');
var amazon_response_UK_stripped = require('./fixtures/amazon_response_UK--stripped');

/*
  Journey:

  1. Create Client
  2. Query Amazon
  3. Merge response chunks into one object
  4. Clean response
  5. Save response

  Required parts:

  - Create client
  - query amazon
  - return

*/

describe('Query Amazon advertising API', function() {
  /*
   * STUB: Amazon.query()
   */

  // Expected AmazonAPI_response
  var amazonAPI_response = [
    {'ASIN': 0},
    {'ASIN': 1},
    {'ASIN': 2},
    {'ASIN': 3},
    {'ASIN': 4},
    {'ASIN': 5},
    {'ASIN': 6},
    {'ASIN': 7},
    {'ASIN': 8},
    {'ASIN': 9}
  ];

  // Stub for amazon.query()
  var query = function query() {
    return new Promise(function promise(resolve) {
      resolve(amazonAPI_response);
    });
  };

  // Expected payload return from amazon.batch_query()
  var expected = [
    {'ASIN': 0},
    {'ASIN': 1},
    {'ASIN': 2},
    {'ASIN': 3},
    {'ASIN': 4},
    {'ASIN': 5},
    {'ASIN': 6},
    {'ASIN': 7},
    {'ASIN': 8},
    {'ASIN': 9},
    {'ASIN': 0},
    {'ASIN': 1},
    {'ASIN': 2},
    {'ASIN': 3},
    {'ASIN': 4},
    {'ASIN': 5},
    {'ASIN': 6},
    {'ASIN': 7},
    {'ASIN': 8},
    {'ASIN': 9},
    {'ASIN': 0},
    {'ASIN': 1},
    {'ASIN': 2},
    {'ASIN': 3},
    {'ASIN': 4},
    {'ASIN': 5},
    {'ASIN': 6},
    {'ASIN': 7},
    {'ASIN': 8},
    {'ASIN': 9},
    {'ASIN': 0},
    {'ASIN': 1},
    {'ASIN': 2},
    {'ASIN': 3},
    {'ASIN': 4},
    {'ASIN': 5},
    {'ASIN': 6},
    {'ASIN': 7},
    {'ASIN': 8},
    {'ASIN': 9}
  ];

  beforeEach(function() {
  });

  describe('#batch_query()', function() {
    it('should populate the arguments object to be sent with Query', function(done) {
      sinon.stub(amazon, 'query', query);

      amazon.batch_query('UK').then(function(payload) {
        assert.deepEqual(payload, expected);
        done();
      });
    });
  });
  describe('#is_in_stock()', function() {
    it('should return 10 ASIN codes in an array', function() {
      var products_in_stock = amazon.generate_in_stock_table(amazon_response_UK);
      assert.typeOf(products_in_stock, 'array');
      assert.lengthOf(products_in_stock, 10);
    });
  });
  describe('#generate_product_table()', function() {
    var response = amazon.generate_product_table(amazon_response_UK);
    var first_key = Object.keys(response)[0];
    var product = response[first_key];

    Object.size = function(obj) {
      var size = 0;
      var key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          size++;
        }
      }
      return size;
    };

    it('should return an object', function() {
      assert.typeOf(response, 'object');
    });
    it('should should return an object with 35 products', function() {
      assert.equal(Object.size(response), 35);
    });
    it('should strip each product down to 7 key pairs', function() {
      assert.equal(Object.size(product), 7);
    });
    describe('response.product object', function() {
      it('should have an ASIN property', function() {
        assert.ok(product.hasOwnProperty('ASIN'));
        assert.typeOf(product.ASIN, 'string');
      });
      it('should have a url property', function() {
        assert.ok(product.hasOwnProperty('url'));
        assert.typeOf(product.url, 'string');
      });
      it('should have a name property', function() {
        assert.ok(product.hasOwnProperty('name'));
        assert.typeOf(product.name, 'string');
      });
      it('should have a title property', function() {
        assert.ok(product.hasOwnProperty('title'));
        assert.typeOf(product.title, 'string');
      });
      it('should have a date property', function() {
        assert.ok(product.hasOwnProperty('date'));
        assert.typeOf(product.date, 'string');
      });
      it('should have a OffersSummary property', function() {
        assert.ok(product.hasOwnProperty('OffersSummary'));
        assert.typeOf(product.OffersSummary, 'string');
      });
      it('should have a Offers property', function() {
        assert.ok(product.hasOwnProperty('Offers'));
        assert.typeOf(product.Offers, 'string');
      });
    })
  });
});
