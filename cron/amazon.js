"use strict";
var amazonAPI = require('amazon-product-api');
var Promise = require('bluebird');

module.exports = {

  create_client: function (credentials) {
    return amazonAPI.createClient(credentials);
  },

  query: function (client, products, domain) {

    var generate_query_arg = function (products, domain) {

      return {
        idType: "ASIN",
        Condition: "New",
        includeReviewsSummary: false,
        itemId: products.toString(),
        responseGroup: "ItemAttributes,Offers", //Images
        domain: domain
      };

    },

    return new Promise(function (revolve, reject) {
      client.itemLookup(generate_query_arg(products, domain),
      function(err, response) {
        err ? reject(err) : resolve(response);
      });
    });
  },

  // collect_responses: function (query_function, args) {

  // Batch calls a query and waits for all promises to complete.
  batch_query: function(query_function, args, times) {
    // Call following function number of times and wait for
    // all promises to complete.
    return query_function(args);
  }

}
