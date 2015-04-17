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

// var amazon_response_UK = require('./fixtures/amazon_response_UK');

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

  describe('batch query', function() {
    it('should populate the arguments object to be sent with Query', function(done) {
      sinon.stub(amazon, 'query', query);

      amazon.batch_query('UK').then(function(payload) {
        assert.deepEqual(payload, expected);
        done();
      });
    });
  });
});
