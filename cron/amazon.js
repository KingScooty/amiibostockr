var amazonAPI = require('amazon-product-api');
var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var r = require('./redis');

var flattenJSON = require('./utils').flattenJSON;
var settings = require('./settings/settings');

var stock = require('./stock');
var productTable = stock.productTable;
var inStockTable = stock.inStockTable;

var amazon = {};
amazon.locale = {};
amazon.clients = {};

/**
 * Load in the required files based on the locale settings in app
 * e.g. UK, US
 */ 

settings.locales.forEach(function(locale, index, array) {
  amazon.locale[locale] = require('./settings/locales/' + locale);
}); 

/**
 * Bootstrap the settings in order to query the correct
 * chunk of product ID's for that locale.
 */

function bootstrap_settings (locale, chunkIndex) {

  return {
    idType: 'ASIN',
    Condition: 'New',
    includeReviewsSummary: false,
    itemId: amazon.locale[locale].ASINchunked[chunkIndex].toString(),
    responseGroup: 'ItemAttributes,Offers', //Images
    domain: amazon.locale[locale].domain
  }

}

function createClients (locale) {
  amazon.clients[locale] = amazonAPI.createClient(amazon.locale[locale].credentials);
}

function queryAmazon (locale, idChunkIndex) {

  var products = amazon.locale[locale].ASINchunked;

  /**
   * Wait for all promises to complete.
   */

  // Promise.all(products.map(function(key, idChunkIndex, array) {
    Promise.all(products.map(function(productsChunk, chunkIndex, array) {

    /**
     * Create new promise and query Amazon based on the 10 product
     * id json chunk.
     */

    return new Promise(function (resolve, reject) {
      amazon.clients[locale]
      .itemLookup(bootstrap_settings(locale, chunkIndex), 
        function(err, results) {
        if (err) { reject(err); } 
        else {
          resolve(results);
        }
      });
    });

  }))

  /**
   * Flatten the results, to break the chunks into one
   */

  .then(function (results) {
    return flattenJSON(results);
  })

  /**
   * Clear out 
   */

  .then(function (results) {
    // console.log(util.inspect(results, false, null));
    return cleanUpResponse(locale, results);
  })

 /**
  * Store the result in Redis.
  * Update the stock.
  */

  .then(function (cleanedProducts) {
    saveToRedis(locale, cleanedProducts);
    // inStockTable[locale] = response.tempStore;
    productTable[locale] = cleanedProducts;
  })

  /**
   * Catch all errors
   */

  .catch(function (error) {
    console.log('Error querying Amazon - ', error);
  });
}

function cleanUpResponse (locale, flattenedResult) {
  return new Promise(function (resolve, reject) {
    var cleanedProducts = [];
    cleanedProducts.push(flattenedResult.map(function(product, index) {

      var isInStock = false;

      if (_.first(product.Offers[0]["TotalOffers"]) === '1') {
        inStockTable[locale][_.first(product.ASIN)] = true;
        isInStock = true;

        console.log(util.inspect(inStockTable, false, null));

      } else {
        delete inStockTable[locale][_.first(product.ASIN)];
      }

      return {
        ASIN : _.first(product.ASIN),
        inStock: isInStock,
        url  : _.first(product.DetailPageURL),
        name : _.first(product.ItemAttributes[0].Edition),
        title: _.first(product.ItemAttributes[0].Title),
        date : _.first(product.ItemAttributes[0].ReleaseDate)
        // OffersSummary: product.OfferSummary,
        // Offers: product.Offers
      }

    }));

    resolve(cleanedProducts);
  });
}



function saveToRedis (locale, flattenedResult) {
  return new Promise(function (resolve, reject) {
    r.set(locale, JSON.stringify(flattenedResult), function(err, reply) {
      if (err) { reject(err) } 
      else {
        console.log('Saving: ', reply);
        resolve(reply);
      }
    });
  });
}



exports.initAmazon = function(locale) {
  createClients(locale);
  queryAmazon(locale);
}

exports.amazon = amazon;

exports.functions = {
  // updateStock: updateStock,
  saveToRedis: saveToRedis
}