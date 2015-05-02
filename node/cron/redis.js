'use strict';
var Redis = require('ioredis');
var redis_store = new Redis({
  // This is the default value of `retryStrategy`
  retryStrategy: function callback(times) {
    var delay = Math.min(times * 2, 2000);
    return delay;
  }
});
var redis_pub = new Redis({
  // This is the default value of `retryStrategy`
  retryStrategy: function callback(times) {
    var delay = Math.min(times * 2, 2000);
    return delay;
  }
});

var Promise = require('bluebird');

var self;

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
    return redis_store.sadd(key, stock_table);
  },

  populate_product_table: function populate_product_table(store, locale, product_table) {
    var key = store + ':' + locale + ':product_table';

    return Promise.all(Object.keys(product_table).map(function callback(id) {
      return redis_store.hmset(key + ':' + id, product_table[id]);
    }));
  },

  /*
   * Utils
   */

  create_new_stock_table: function create_stock_table(new_stock_key, stock_table) {
    return redis_store.sadd(new_stock_key, stock_table);
  },

  get_in_stock_changes: function get_in_stock_changes(current_stock_key, new_stock_key) {
    return redis_store.sdiff(new_stock_key, current_stock_key);
  },

  broadcast_in_stock_changes: function broadcast_in_stock_changes(response) {
    return redis_pub.publish('in_stock_changes', JSON.stringify(response));
  },

  get_out_stock_changes: function get_out_stock_changes(current_stock_key, new_stock_key) {
    return redis_store.sdiff(current_stock_key, new_stock_key);
  },

  broadcast_out_stock_changes: function broadcast_out_stock_changes(response) {
    return redis_pub.publish('out_stock_changes', JSON.stringify(response));
  },

  replace_current_stock_with_new_stock: function replace_current_stock_with_new_stock(current_stock_key, new_stock_key) {
    return redis_store.sdiffstore(current_stock_key, new_stock_key);
  },

  delete_new_stock_table: function delete_new_stock_table(new_stock_key) {
    return redis_store.del(new_stock_key);
  },

  /*
   */

  update_stock_table: function update_stock_table(store, locale, stock_table) {
    var current_stock = store + ':' + locale + ':stock_table';
    var new_stock = store + ':' + locale + ':new_stock_table';

    return self.create_new_stock_table(new_stock, stock_table)
    .then(function callback() {
      return Promise.join(
        self.get_in_stock_changes(current_stock, new_stock)
          .then(self.broadcast_in_stock_changes),

        self.get_out_stock_changes(current_stock, new_stock)
          .then(self.broadcast_out_stock_changes)
      );
    })
    .then(function callback() {
      return self.replace_current_stock_with_new_stock(current_stock, new_stock);
    })
    .then(function callback() {
      return self.delete_new_stock_table(new_stock);
    });


    // should overwrite the current stock with the new stock table
    // redis_store.sdiffstore(current_stock, new_stock);
    // should delete the new stock table.
    // redis_store.del(new_stock);

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

    return Promise.all([redis_store.exists(key1), redis_store.exists(key2)]).then(function callback(response) {
      if ((response[0] === 0) || (response[1] === 0)) {
        if (response[0] === 0) {
          self.populate_stock_table(store, locale, stock_table);
        }
        if (response[1] === 0) {
          self.populate_product_table(store, locale, product_table);
        }
      } else {
        self.update_stock_table();
      }
    });
  }
};
