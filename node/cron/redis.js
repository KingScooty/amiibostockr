'use strict';
var redis = require('redis');
var _ = require('lodash');

// var r = redis.createClient();
//
// r.on("error", function (err) {
//     console.log("Error " + err);
// });

/*

init
  populate the stock table
  populate the persistent product table

update stock table
  remove out of stock
  add in stock

*/

var self = module.exports = {

  populate_stock_table: function populate_stock_table() {
    // 'amazon:UK:is_in_stock'
    // client.sadd('is_in_stock', ASIN);
  },

  populate_persistent_product_table: function populate_persistent_product_table() {

  },


  process_data: function process_data(data) {

  },

  save: function save(response) {

    // r.hmset("product:2", {
    //   "ASIN": '02',
    //   "is_in_stock": false,
    //   'all_fields': JSON.stringify({'title': 'some title', 'price': '5.99'})
    // }, function(err, response) {
    //   console.log(response);
    // });

  }

};
