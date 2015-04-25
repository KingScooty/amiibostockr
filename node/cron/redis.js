'use strict';
var Redis = require('ioredis');
var redis = new Redis();
var diff = require('deep-diff').diff;

// var redis = require('redis');
var Promise = require('bluebird');
// var redis = Promise.promisifyAll(require('redis'));

var self;

// var r = redis.createClient();
// var redisExists = Promise.promisify(r.exists, r);

// r.on('error', function callback(err) {
//   console.log('Error ' + err);
// });

/*

init
  populate the stock table
  populate the persistent product table

update stock table
  remove out of stock
  add in stock

*/

self = module.exports = {

  populate_stock_table: function populate_stock_table(store, locale, stock_table) {
    var key = store + ':' + locale + ':stock_table';
    return redis.sadd(key, stock_table);
  },

  populate_product_table: function populate_product_table(store, locale, product_table) {
    var key = store + ':' + locale + ':product_table';

    return Promise.all(Object.keys(product_table).map(function callback(id) {
      return redis.hmset(key + ':' + id, product_table[id]);
    }));
  },

  update_stock_table: function update_stock_table(store, locale, stock_table) {
    var current_stock = store + ':' + locale + ':stock_table';
    var new_stock = store + ':' + locale + ':new_stock_table';
    console.log('update stock table called');
    console.log('spy not stopping this from being called');
    /*
    Redis stock set already exists.
      e.g [val1, val5, val3, val8]

    New stock list comes through
      e.g [val1, val3, val8, val9]

    The difference SDIFF = val5, val9.
    However, this isn't enough info. We need to know more.

    val5 is being removed, while val9 is being introduced. How do we track this?

    SINTER current_stock new_stock
    = values that exist in both.

    FOUND IT!

    SDIFF current_stock new_stock = out of stock items
    SDIFF new_stock current_stock = NEW STOCK items!

    SINTER current_stock new_stock = stock that didn't change

    */
    // should create a new stock table
    redis.sadd(new_stock, stock_table).then(function callback() {
      // should return and broadcast the new in stock changes
      var in_stock = redis.sdiffstore(new_stock, current_stock)
      .then(function callback(response) {
        redis.publish('in_stock_changes', response);
      });

      // should return and broadcast the new out of stock changes
      var out_stock = redis.sdiffstore(current_stock, new_stock)
      .then(function callback(response) {
        redis.publish('out_stock_changes', response);
      });

      return Promise.all([in_stock, out_stock]);
      // return [in_stock, out_stock];
    })
    .then(function callback() {
      return redis.sdiffstore(current_stock, new_stock);
    })
    .then(function callback() {
      return redis.del(new_stock);
    });

    // should overwrite the current stock with the new stock table
    // redis.sdiffstore(current_stock, new_stock);
    // should delete the new stock table.
    // redis.del(new_stock);

    /*

    sadd new_stock "2 4 5"
    sdiffstore in_stock_changes new_stock old_stock <--- subscribe to this event/key for new in stock
    //
    publish in_stock_changes
    //
    sdiffstore out_stock_changes old_stock new_stock <--- subscribe to this event/key for new out of stock
    //
    publish out_stock_changes
    //
    sdiffstore current_stock new_stock -- overwrite current_stock to new_stock
    del new_stock -- delete new_stock
    */
  },


  process_data: function process_data(payload) {
    var store = payload.store;
    var locale = payload.locale;
    var stock_table = payload.in_stock_table;
    var product_table = payload.product_table;

    var key1 = store + ':' + locale + 'stock_table';
    var key2 = store + ':' + locale + 'product_table';

    // self.populate_stock_table(store, locale, stock_table);
    // self.populate_product_table(store, locale, stock_table);


    // var keys_exist = false;

    // return new Promise(function promise(resolve, reject) {
    // return Promise.all([r.exists('key1'), r.exists('key2')], function() {
    //   console.log('hello?')
    // });

    // return Promise.all([redisExists(key1), redisExists(key2)]).then(function callback(response) {
    return Promise.all([redis.exists(key1), redis.exists(key2)]).then(function callback(response) {
      // console.log(response);
      if ((response[0] === 0) || (response[1] === 0)) {
        // console.log('0 0 baby!');
        if (response[0] === 0) {
          // console.log('this should be called');
          self.populate_stock_table(store, locale, stock_table);
        }
        if (response[1] === 0) {
          self.populate_product_table(store, locale, product_table);
        }
      } else {
        self.update_stock_table();
      }
    });

    // /*
    //  * Catch errors.
    //  */
    // .catch(function callback(e) {
    //   console.log('Exception ' + e);
    // });

    // redisExists(key1).then(function callback(response) {
    //   if (response === 0) {
    //     self.populate_stock_table(store, locale, stock_table);
    //   }
    // });
    //
    // redisExists(key2).then(function callback(response) {
    //   if (response === 0) {
    //     self.populate_product_table(store, locale, product_table);
    //   }
    // });

    // if ((!r.exists(key1)) || (!r.exists(key2))) {
    //   self.initialise_redis_tables(store, locale, stock_table, product_table);
    // } else {
    //   self.update_stock_table();
    // }
  }

};
