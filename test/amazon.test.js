// var assert = require("chai").assert;
var assert = require("assert");

var _ = require('lodash');
var O = require('observed');
var sinon = require('sinon');

/**
 * Dependencies
 */

var amazon = require('../cron/amazon');

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

  describe('generate query arguments', function () {
    it('should populate the arguments object to be sent with Query', function() {

      amazon.generate_query_arg()

    });
  });

  describe('save to redis', function () {

  });

});