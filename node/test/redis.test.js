'use strict';
var assert = require('chai').assert;

var sinon = require('sinon');
var Rewire = require('rewire');

/**
 * Dependencies
 */

 /*eslint-disable */
var redis = Rewire('../cron/redis');
/*eslint-enable */

/**
 * Fixtures
 */

// var amazon_response_UK = require('./fixtures/amazon_response_UK');
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
        redis.__set__('redisExists', redisMock);
        /*eslint-enable */
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
        assert.equal(stub__update_stock_table.callCount, 0);
      });
    });
    describe('if redis tables populated', function() {
      before(function() {
        var redisMock = sinon.spy(function() {
          return 1;
        });

        /*eslint-disable */
        redis.__set__('redisExists', redisMock);
        /*eslint-enable */
      });

      it('should NOT call populate_stock()', function(done) {
        redis.process_data(payload).then(function() {
          assert.equal(stub__populate_stock.callCount, 0);
          done();
        });
      });
      it('should NOT call populate_products()', function(done) {
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
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
  describe('Save to redis', function() {
  });
});
