'use strict';
var assert = require('chai').assert;

// var r = require('redis').createClient();
var Redis = require('ioredis');
var r = new Redis();
var sinon = require('sinon');
var Rewire = require('rewire');
// var _ = require('lodash');

/**
 * Dependencies
 */

 /*eslint-disable */
var redis = Rewire('../cron/redis');
/*eslint-enable */

/**
 * Fixtures
 */

var payload = require('./fixtures/amazon_response_UK--stripped');

describe('Redis', function() {
  describe('#process_data()', function() {
    var stub__populate_stock;
    var stub__populate_products;
    var stub__update_stock_table;

    var blank_stub = function blank_stub() {
      return new Promise(function promise(resolve) {
        resolve(true);
      });
    };

    beforeEach(function() {
      stub__populate_stock = sinon.stub(redis, 'populate_stock_table', blank_stub);
      stub__populate_products = sinon.stub(redis, 'populate_product_table', blank_stub);
      stub__update_stock_table = sinon.stub(redis, 'update_stock_table', blank_stub);
    });

    afterEach(function() {
      stub__populate_stock.restore();
      stub__populate_products.restore();
      stub__update_stock_table.restore();
    });

    describe('if redis tables are empty', function() {
      before(function() {
        var redisMock = sinon.spy(function() {
          return 0;
        });

        /*eslint-disable */
        redis.__set__('redis.exists', redisMock);
        /*eslint-enable */
      });

      it('should call populate_stock_table()', function(done) {
        redis.process_data(payload).then(function() {
          assert.ok(stub__populate_stock.calledOnce);
          done();
        });
      });
      it('should call populate_products_table()', function(done) {
        redis.process_data(payload).then(function() {
          assert.ok(stub__populate_products.calledOnce);
          done();
        });
      });
      it('should not call update_stock_table()', function() {
        assert.equal(stub__update_stock_table.callCount, 0);
      });
    });
    describe('if redis tables populated', function() {
      before(function() {
        var redisMock = sinon.spy(function() {
          return 1;
        });

        /*eslint-disable */
        redis.__set__('redis.exists', redisMock);
        /*eslint-enable */
      });

      it('should NOT call populate_stock_table()', function(done) {
        redis.process_data(payload).then(function() {
          assert.equal(stub__populate_stock.callCount, 0);
          done();
        });
      });
      it('should NOT call populate_products_table()', function(done) {
        redis.process_data(payload).then(function() {
          assert.equal(stub__populate_products.callCount, 0);
          done();
        });
      });
      it('should call update_stock_table()', function(done) {
        redis.process_data(payload).then(function() {
          assert.ok(stub__update_stock_table.calledOnce);
          done();
        });
      });
    });
  });
  describe('#populate_stock_table()', function() {
    beforeEach(function() {
    });
    afterEach(function() {
      // r.flushdb();
    });

    it('should create a SET name based on passed through parameters', function(done) {
      var store = 'amazon';
      var locale = 'UK';
      // var stock_table1 = { 0: 'BS121', 1: 'BS123', 2: 'BS125'};
      var stock_table = ['BS121', 'BS123', 'BS125'];
      // console.log(r);

      redis.populate_stock_table(store, locale, stock_table).then(function callback() {
        r.smembers('amazon:UK:stock_table').then(function(response) {
          var response_array = Array.prototype.slice.call(response);

          function are_arrs_equal(arr1, arr2) {
            return arr1.sort().toString() === arr2.sort().toString();
          }

          assert.ok(are_arrs_equal(stock_table, response_array));
          done();
        });
      });
    });
  });
  describe('#populate_products_table()', function() {
  });
  describe('#update_stock_table()', function() {
  });
  describe('Save to redis', function() {
  });
});
