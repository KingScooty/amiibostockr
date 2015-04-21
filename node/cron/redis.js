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
    client.sadd('is_in_stock', ASIN);
  },

  populate_persistent_product_table: function populate_persistent_product_table() {

  },

  init: function init() {

  },

  process_data: function process_data(data) {

  },

  strip_response: function strip_response(response) {
    response.map(function(obj, index) {
      // console.log(obj);
      // var string = JSON.stringify(response);
      // console.log(string);

      // if (index === 0) {
      //   console.log(obj);
      // }
      // var obj = [obj];

      var new_obj = {
        ASIN: _.first(obj.ASIN),
        // inStock: isInStock, <<-- pass off to function
        url: _.first(obj.DetailPageURL),
        name: _.first(obj.ItemAttributes[0].Edition),
        title: _.first(obj.ItemAttributes[0].Title),
        date: _.first(obj.ItemAttributes[0].ReleaseDate)
        // OffersSummary: product.OfferSummary, <<-- stringify
        // Offers: product.Offers <<-- stringify
      };
      // console.log(obj);
      console.log(_.first(_.first(obj.ItemAttributes).Edition));

      // var string = JSON.stringify(response);
      // console.log(_.pluck(obj, 'TotalOffers'));
      // console.log(_.pluck(obj, 'ASIN'));
      // console.log(_.pluck(obj, 'TotalOffers'));
      // var striped_object = {
      //
      // }

      // var test = _.pluck(_.filter(obj, {
      //     'Offers': [
      //       {
      //         'TotalOffers': ['1']
      //       }
      //     ]
      //   }), 'ASIN');

      // console.log(test);

      // var striped_object = {
      //
      // }
    });
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
