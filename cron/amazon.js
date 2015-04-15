'use strict';
var amazonAPI = require('amazon-product-api');
var Promise = require('bluebird');
var _ = require('lodash');

var settings = require('./settings/settings');

var self = module.exports = {

  create_client: function create_client(credentials) {
    return amazonAPI.createClient(credentials);
  },

  /*
   * query(object, array, string);
   * query(client_UK, [1,2,3], 'domain.com');
   */

  query: function query(client, product_array, domain) {
    var args = {
        idType: 'ASIN',
        Condition: 'New',
        includeReviewsSummary: false,
        itemId: product_array.toString(),
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

  /*
   * batch_query('UK')
   * Generate args from settings file and return response
   */

  batch_query: function batch_query(locale) {
    /*
     * Batch calls a query and waits for all promises to complete.
     * Call following function number of times and wait for
     * all promises to complete.
     */

    var args = {
      client: self.create_client(settings[locale].CREDS),
      product_chunks: settings[locale].ASIN_CHUNKS,
      domain: settings[locale].DOMAIN
    };

    return Promise.all(args.product_chunks.map(function callback(chunk, index) {
      return self.query(args);
    }))

    // Flatten payload chunks into one array
    .then(function callback(payload) {
      return _.flatten(payload);
    })

    .catch(function callback(e) {
      console.log('Exception ' + e);
    });
  }

};
