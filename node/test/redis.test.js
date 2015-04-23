'use strict';
var assert = require('chai').assert;
// var assert = require("assert");

// var _ = require('lodash');
// var O = require('observed');
var sinon = require('sinon');
var Rewire = require('rewire');
// var Promise = require('bluebird');

/**
 * Dependencies
 */

var redis = Rewire('../cron/redis');

/**
 * Fixtures
 */

// var amazon_response_UK = require('./fixtures/amazon_response_UK');
var payload = require('./fixtures/amazon_response_UK--stripped');

describe('Redis', function() {
  describe('#process_data()', function() {
    var stub = function stub() {
      return new Promise(function promise(resolve) {
        resolve(true);
      });
    };

    // var redisMock = {
    //   exists: sinon.spy(function() {
    //     console.log('you fucking prick!');
    //     return [0, 0];
    //   })
    // };

    var redisMock = sinon.spy(function() {
      return 0;
    });

    /*eslint-disable */
    redis.__set__('redisExists', redisMock);
    /*eslint-enable */

    describe('if redis tables are empty', function() {
      var stub__populate_stock;
      var stub__populate_products;
      var spy__update_stock_table;

      beforeEach(function() {
        stub__populate_stock = sinon.stub(redis, 'populate_stock_table', stub);
        stub__populate_products = sinon.stub(redis, 'populate_product_table', stub);
        spy__update_stock_table = sinon.spy(redis, 'update_stock_table');
      });

      afterEach(function() {
        stub__populate_stock.restore();
        stub__populate_products.restore();
        spy__update_stock_table.restore();
      });

      it('should call populate_stock()', function(done) {
        redis.process_data(payload).then(function() {
          assert.ok(stub__populate_stock.calledOnce);
          done();
        });
      });
      it('should call populate_products()', function(done) {
        redis.process_data(payload).then(function() {
          assert.ok(stub__populate_products.calledOnce);
          done();
        });
      });
      it('should not call update_stock_table()', function() {
        assert.equal(spy__update_stock_table.callCount, 0);
      });
    });
    describe('if redis tables populated', function() {
      it('should ', function() {

      });
      it('should...', function() {

      });
    });
  });
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
});
