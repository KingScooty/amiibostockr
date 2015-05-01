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
  var store = 'amazon';
  var locale = 'UK';
  var product_table = payload.product_table;
  var stock_table = payload.in_stock_table;

  // amazon:UK:stock_table
  var current_stock_key = store + ':' + locale + ':stock_table';
  // amazon:UK:new_stock_table
  var new_stock_key = store + ':' + locale + ':new_stock_table';

  // The 2 diffs are the only 2 products that differ from
  // stock_table.
  var new_stock_table = [
    'B00Q6A56DY',
    'B00Q6A57A2', // diff
    'B00N8PBTDS', // diff
    'B00QGBNLTO',
    'B00QGBNLU8'
  ];

  var new_stock_diff = [
    'B00Q6A57A2',
    'B00N8PBTDS'
  ];

  // Should show all the ones that are removed when new_stock_table
  // comes in to replace current_stock.
  var out_stock_diff = [
    'B00Q6A57J2',
    'B00N8PBYK4',
    'B00N8PBTVS',
    'B00N8PBOFO',
    'B00N8PBQDE',
    'B00N8PBGV6',
    'B00N8PBMK6'
  ];

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
      r.flushdb();
    });
    afterEach(function() {
      r.flushdb();
    });

    it('should create a SET name based on passed through parameters', function(done) {
      // var store = 'amazon';
      // var locale = 'UK';
      var stock_table_example = ['BS121', 'BS123', 'BS125'];

      redis.populate_stock_table(store, locale, stock_table_example).then(function callback() {
        r.smembers('amazon:UK:stock_table').then(function(response) {
          assert.sameDeepMembers(stock_table_example, response);
          done();
        });
      });
    });
  });

  describe('#populate_products_table()', function() {
    var expected_response = product_table.B00Q6A57J2;
    var returned_response;

    before(function(done) {
      redis.populate_product_table(store, locale, product_table).then(function callback() {
        r.hgetall('amazon:UK:product_table:B00Q6A57J2').then(function callback(response) {
          returned_response = response;
          done();
        });
      });
    });

    after(function() {
      r.flushdb();
    });

    it('should successfully save in the correct format to redis', function() {
      assert.deepEqual(returned_response, expected_response);
    });
    it('return should have an ASIN field', function() {
      assert.property(returned_response, 'ASIN');
    });
    it('return should have a url field', function() {
      assert.property(returned_response, 'url');
    });
    it('return should have a date field', function() {
      assert.property(returned_response, 'date');
    });
    it('return should have a title field', function() {
      assert.property(returned_response, 'title');
    });
    it('return should have a name field', function() {
      assert.property(returned_response, 'name');
    });
    it('return should have an Offers field', function() {
      assert.property(returned_response, 'Offers');
    });
    it('return should have an OffersSummary field', function() {
      assert.property(returned_response, 'OffersSummary');
    });
  });

  describe('Redis utils', function() {
    before(function() {
      r.flushdb();
    });

    describe('Initialise check', function() {
      after(function() {
        r.flushdb();
      });

      describe('#create_new_stock_table()', function() {
        it('should create create a new stock table in redis', function(done) {
          redis.create_new_stock_table(new_stock_key, new_stock_table).then(function(response) {
            assert.ok(response);
            r.smembers('amazon:UK:new_stock_table').then(function(members) {
              assert.sameDeepMembers(new_stock_table, members);
              done();
            });
          });
        });
      });
    });

    describe('Chainable checks', function() {
      beforeEach(function(done) {
        redis.create_new_stock_table(new_stock_key, new_stock_table)

        .then(function() {
          redis.populate_stock_table(store, locale, stock_table).then(function() {
            done();
          });
        });
      });

      afterEach(function() {
        r.flushdb();
      });

      describe('#get_in_stock_changes()', function() {
        it('should return a list of in stock product ids', function(done) {
          redis.get_in_stock_changes(current_stock_key, new_stock_key).then(function(members) {
            assert.sameMembers(new_stock_diff, members);
            done();
          });
        });
      });

      describe('#broadcast_in_stock_changes()', function() {
        var r1 = new Redis();

        before(function() {
          r1.subscribe('in_stock_changes');
        });

        after(function() {
          r1.unsubscribe();
        });

        it('should broadcast latest IN stock changes via pub/sub', function(done) {
          r1.on('message', function(channel, message) {
            assert.sameMembers(new_stock_diff, JSON.parse(message));
            done();
          });
          redis.get_in_stock_changes(current_stock_key, new_stock_key).then(function(members) {
            redis.broadcast_in_stock_changes(members);
          });
        });
      });

      describe('#get_out_stock_changes()', function() {
        it('should return a list of out stock product ids', function(done) {
          redis.get_out_stock_changes(current_stock_key, new_stock_key).then(function(members) {
            assert.sameMembers(out_stock_diff, members);
            done();
          });
        });
      });

      describe('#broadcast_out_stock_changes()', function() {
        var r1 = new Redis();

        before(function() {
          r1.subscribe('out_stock_changes');
        });

        after(function() {
          r1.unsubscribe();
        });

        it('should broadcast latest OUT stock changes via pub/sub', function(done) {
          r1.on('message', function(channel, message) {
            assert.sameMembers(out_stock_diff, JSON.parse(message));
            done();
          });

          redis.get_out_stock_changes(current_stock_key, new_stock_key).then(function(members) {
            redis.broadcast_out_stock_changes(members);
          });
        });
      });

      describe('#replace_current_stock_with_new_stock()', function() {
        it('should replace the contents of the current_stock table with the new_stock table', function(done) {
          r.smembers('amazon:UK:stock_table').then(function(members) {
            assert.sameMembers(stock_table, members);
          });

          r.smembers('amazon:UK:new_stock_table').then(function(members) {
            assert.sameMembers(new_stock_table, members);
          });

          redis.replace_current_stock_with_new_stock(current_stock_key, new_stock_key)
          .then(function(response) {
            assert.ok(response);
            r.smembers('amazon:UK:stock_table').then(function(members) {
              assert.sameMembers(new_stock_table, members);
              done();
            });
          });
        });
      });

      describe('#delete_new_stock_table()', function() {
        it('should delete the new_stock_table', function(done) {
          r.smembers('amazon:UK:new_stock_table')
          .then(function(members) {
            assert.sameMembers(new_stock_table, members);
          })
          .then(function() {
            redis.delete_new_stock_table(new_stock_key)
            .then(function(response) {
              assert.ok(response);
              done();
            });
          });
        });
      });
    });
  });

  describe('#update_stock_table()', function() {
    var r1 = new Redis();
    var r2 = new Redis();

    before(function(done) {
      r1.subscribe('in_stock_changes');
      r2.subscribe('out_stock_changes');

      redis.populate_stock_table(store, locale, stock_table).then(function() {
        done();
      });
    });

    after(function() {
      r1.unsubscribe();
      r2.unsubscribe();

      r.flushdb();
    });

    it('should run all the chained util events and broadcast to 2 streams', function(done) {
      var in_stock_message;
      var out_stock_message;

      r1.on('message', function(channel, message) {
        in_stock_message = JSON.parse(message);
      });

      r2.on('message', function(channel, message) {
        out_stock_message = JSON.parse(message);
      });

      redis.update_stock_table(store, locale, new_stock_table).then(function() {
        assert.sameMembers(new_stock_diff, in_stock_message);
        assert.sameMembers(out_stock_diff, out_stock_message);
        done();
      });
    });
  });
});
