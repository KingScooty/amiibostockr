var assert = require("chai").assert;
// var assert = require("assert");

var _ = require('lodash');
var O = require('observed');
var sinon = require('sinon');

/**
 * Dependencies
 */

var amazon = require('../cron/amazon');

/**
 * Fixtures
 */

 var amazon_response_UK = require('./fixtures/amazon_response_UK');

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

  var products = ['1', '2', '3'];
  var domain = 'domain.com';

  describe('generate query arguments', function () {
    it('should populate the arguments object to be sent with Query', function() {

      var response = amazon.generate_query_arg(products, domain);

      var expected =  {
        idType: 'ASIN',
        Condition: 'New',
        includeReviewsSummary: false,
        itemId: '1,2,3',
        responseGroup: 'ItemAttributes,Offers',
        domain: 'domain.com'
      }

      assert.deepEqual(response, expected);

    });

  });

  describe('Collect Query Amazon responses', function () {

    var CREDS = {
      awsId: 'user',
      awsSecret: 'pass',
      awsTag: 'tag'
    };

    it('should receive multiple payloads from query function', function () {
      // Spy on query and hijack it. Forcing it to return a payload.
      var spy = sinon.spy(amazon, 'query').andReturn(amazon_response_UK)


      // var spy = sinon.spy(amazon, "generate_query_arg");
      // sinon.stub(amazon.query, 'client.itemLookup').returns(amazon_response_UK);
      //
      // var client = create_client()
      //
      // var result = amazon.query(['1,2,3'], 'domain.com')
      //

      // var mock = sinon.mock(amazon);
      //
      // mock
      //   .expects('query')
      //   .withExactArgs(CREDS, products, domain)
      //   .once();
      //
      // amazon.query(CREDS, products, domain);
      //
      // mock.verify();
      // assert.ok(spy.calledOnce);
      // amazon.generate_query_arg.restore();

    })

    it('should wait for all of the payloads before acting', function() {

    });
  });

});
