'use strict';
var amazonAPI = require('amazon-product-api');
var Promise = require('bluebird');
var _ = require('lodash');

var settings = require('./settings/settings');

var self = module.exports = {

  /**
   * create_client() creates a new amazonAPI client.
   *
   * @params {Object} credentials
   * @returns {Object} amazon API client
   */

  create_client: function create_client(credentials) {
    return amazonAPI.createClient(credentials);
  },

  /**
   * query() calls the amazon API using the given params
   * and returns a response. Can query a max of 10 products at a time.
   *
   * @params {Object, Array, String} client, product_array, domain
   * @return {response} response
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

  /**
   * batch_query() calls query() and returns a callback once all queries
   * have returned, and have been batched together into
   * one single, flattened object.
   *
   * @param {string} locale
   * @return {payload} payload
   */

  batch_query: function batch_query(locale) {
    /*
     * Generate args based on locale.
     * Grab constants from relevant locale settings file.
     */
    var args = {
      client: self.create_client(settings[locale].CREDS),
      product_chunks: settings[locale].ASIN_CHUNKS,
      domain: settings[locale].DOMAIN
    };

    /*
     * Wait for all queries to return before returning callback
     */
    return Promise.all(args.product_chunks.map(function callback() {
      /*
       * Return response for one query
       */
      return self.query(args);
    }))

    /*
     * Flatten payload chunks into one array
     */
    .then(function callback(payload) {
      return _.flatten(payload);
    })

    /*
     * Catch errors.
     */
    .catch(function callback(e) {
      console.log('Exception ' + e);
    });
  }

};
