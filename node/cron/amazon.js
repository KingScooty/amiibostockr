'use strict';
var amazonAPI = require('amazon-product-api');
var Promise = require('bluebird');
var _ = require('lodash');

var settings = require('./settings/settings');

/*

init
  call batch query based on locale
      query amazon API via lookup item (max 10 items)
    wait for all queries to complete
    flatten payload

  generate amazon locale stock table
  generate amazon locale product table

  return in stock object; product object;

*/

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

  query: function query(client, product_chunks, domain) {
    var args = {
        idType: 'ASIN',
        Condition: 'New',
        includeReviewsSummary: 'false',
        itemId: product_chunks.toString(),
        responseGroup: 'ItemAttributes,Offers', // Images
        domain: domain
    };

    return client.itemLookup(args);
  },

  /**
   * batch_query() calls query() several times depending on the number of chunks,
   * and returns a callback once all queries have returned, and have been
   * batched together into one single, flattened object.
   *
   * @param {string} locale
   * @return {payload} payload
   */

  batch_query: function batch_query(locale) {
    /*
     * Generate args based on locale.
     * Grab constants from relevant locale settings file.
     */
    // var args = {
    //   client: self.create_client(settings[locale].CREDS),
    //   product_chunks: settings[locale].ASIN_CHUNKS,
    //   domain: settings[locale].DOMAIN
    // };
    var client = self.create_client(settings[locale].CREDS);
    var domain = settings[locale].DOMAIN;
    var product_chunks = settings[locale].ASIN_CHUNKS;

    /*
     * Wait for all queries to return before returning callback
     */
    return Promise.all(product_chunks.map(function callback(val, index) {
      /*
       * Return response for one query
       */
      return self.query(
        client,
        product_chunks[index],
        domain
      );
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
  },

  /**
   * generate_in_stock_table() creates an array of product ASIN codes that are
   * currently in stock.
   *
   * @param {object} payload
   * @return {array} products_in_stock
   */

  generate_in_stock_table: function generate_in_stock_table(payload) {
    var products_in_stock = _.pluck(_.filter(payload, {
        'Offers': [
          {
            'TotalOffers': ['1']
          }
        ]
      }), 'ASIN');

    return _.flattenDeep(products_in_stock);
  },

  /**
   * generate_product_table() creates a new stripped down payload object
   * with stringified offers JSON.
   *
   * @param {object} payload
   * @return {array} new_payload
   */

  generate_product_table: function generate_product_table(payload) {
    var new_payload = {};

    payload.map(function callback(product) {
      new_payload[product.ASIN] = {
        ASIN: _.first(product.ASIN),
        url: _.first(product.DetailPageURL),
        name: _.first(product.ItemAttributes[0].Edition),
        title: _.first(product.ItemAttributes[0].Title),
        date: _.first(product.ItemAttributes[0].ReleaseDate),
        OffersSummary: JSON.stringify(product.OfferSummary),
        Offers: JSON.stringify(product.Offers)
      };
    });

    return new_payload;
  },

  /**
   * init() triggers a batch_query based on locale, waits for return,
   * and then runs data transforms to produce an in_stock table, and a
   * product table, and returns these in a callback.
   *
   * @param {string} locale
   * @return {object, object} in_stock_table, product_table
   */

  init: function init(locale) {
    return self.batch_query(locale)
    .then(function callback(payload) {
      return {
        store: 'amazon',
        locale: locale,
        in_stock_table: self.generate_in_stock_table(payload),
        // Potentially only has to do this on initialise?
        // Surpress for subequent API calls?
        product_table: self.generate_product_table(payload)
      };
    });
  }

};
