var assert = require("assert"); // node.js core module

var _ = require('lodash');
var O = require('observed');
var sinon = require('sinon');

// var STOCK = require('../cron/stock').STOCK;
var stock = require('../cron/stock');
var STOCK = stock.STOCK;
// var stock = require('../cron/amazon').functions;

// var flattenJSON = require('../cron/utils').flattenJSON;
// var productsInStock = require('../cron/utils').productsInStock;

var payloadUK = require('./fixtures/payload_grouped_UK');
var payload2UK = require('./fixtures/payload_final_UK');
var payload2US = require('./fixtures/payload_final_US');
var inStockUK = require('./fixtures/inStock_UK');
var inStockUS = require('./fixtures/inStock_US');

describe('Stock Module', function() {
  describe('Stock Utils', function() {

    describe('#productInStock', function() {
      it('should filter the ASIN ids that are in stock', function() {
        assert.equal(10, stock.productsInStock(payload2UK).length);
      });
    });

    describe('#resetStockValues', function() {
      it('should reset all stock values to false', function() {
        // var ASIN = amazon.locale.UK.ASIN;
        var ASIN = STOCK.UK;

        function checkAllFalse() {
          return _.every(_.values(ASIN), function(v) {return !v;});        
        }

        assert.equal(checkAllFalse(), true);

        stock.updateStock('UK', payload2UK);
        assert.equal(checkAllFalse(), false);

        stock.resetStockValues(ASIN);
        assert.equal(checkAllFalse(), true);

      });
    });

    describe('#updateStock', function() {
      it('should truthy all the ASIN ids that are in stock', function() {
        stock.updateStock('UK', payload2UK);
        stock.updateStock('US', payload2US);

        assert.deepEqual(inStockUK, STOCK.UK);
        assert.deepEqual(inStockUS, STOCK.US);
      });
    });

  })

  describe('Products stock object', function() {

    var amazon = require('../cron/amazon').amazon;

    it('Should bootstrap a STOCK object that maps to the amazon locale ASIN object', function() {
      assert.deepEqual(STOCK.UK, amazon.locale.UK.ASIN);
      assert.deepEqual(STOCK.US, amazon.locale.US.ASIN);

      stock.updateStock('UK', payload2UK);
      stock.updateStock('US', payload2US);

      assert.deepEqual(STOCK.UK, inStockUK);
      assert.deepEqual(STOCK.US, inStockUS);
    });

  });

  describe('#EventEmitter', function (done) {

    before(function() {
      var ASIN = STOCK.UK;
      stock.resetStockValues(ASIN);
    });


    it('Should emit only when stock changes', function(done) {
      // var eventSpy = sinon.spy();
      /**

      FOR ASYNC SINON:
      http://stackoverflow.com/questions/16826352/whats-the-best-way-to-unit-test-an-event-being-emitted-in-nodejs

      setTimeout(function() {
        assert(eventSpy.called, 'Event did not fire in 1000ms.');
        assert(eventSpy.calledOnce, 'Event fired more than once');
        done();
      }, 1000);
      */

      // var object = { name: { last: 'Heckmann', first: true }}
      // var ee = O(object)
      // ee.on('update name.first', console.log)

      // object.name.first = false

      var ee = O(stock.STOCK);
      ee.on('update', function() {
        assert(true);
        done();
      });

      stock.STOCK.UK["B00N8PBS0"] = false;
      stock.STOCK.UK["B00N8PBYK4"] = true;

    });

  })
});