'use strict';
var amazonAPI = require('amazon-product-api');
var Promise = require('bluebird');

var self = module.exports = {

  create_client: function create_client(credentials) {
    return amazonAPI.createClient(credentials);
  },

  /*
   * query(object, array, string);
   * query(client_UK, [1,2,3], 'domain.com');
   */

  query: function query(client, products, domain) {
    var args = {
        idType: 'ASIN',
        Condition: 'New',
        includeReviewsSummary: false,
        itemId: products.toString(),
        responseGroup: 'ItemAttributes,Offers', // Images
        domain: domain
    };

    return new Promise(function promise(resolve, reject) {
      client.itemLookup(args, function callback(err, response) {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  },

  // settings.UK

  batch_query: function batch_query() {
    /*
     * Batch calls a query and waits for all promises to complete.
     * Call following function number of times and wait for
     * all promises to complete.
     *
     * sets
     */
    Promise.all(product_chunks.map(function callback(products) {
      return self.query(products);
    }));
  }

  // get_results: function get_results() {
  //
  // }

};
