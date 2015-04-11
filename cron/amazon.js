var amazonAPI = require('amazon-product-api');
var util = require('util');
var Promise = require('bluebird');
var flattenJSON = require('./utils').flattenJSON;
var r = require('./redis');

var settings = require('../app/settings');

var amazon = {};
amazon.locale = {};
amazon.clients = {};

/**
 * Load in the required files based on the locale settings in app
 * e.g. UK, US
 */ 

settings.locales.forEach(function(locale, index, array) {
  amazon.locale[locale] = require('./' + locale);
}); 

/**
 * Bootstrap the settings in order to query the correct
 * chunk of product ID's for that locale.
 */

function bootstrap_settings (locale, idChunkIndex) {

  return {
    idType: 'ASIN',
    Condition: 'New',
    includeReviewsSummary: false,
    itemId: amazon.locale[locale].ids[idChunkIndex].toString(),
    // responseGroup: 'ItemAttributes,Offers,Images',
    domain: amazon.locale[locale].domain
  }

}

function createClients (locale) {
  amazon.clients[locale] = amazonAPI.createClient(amazon.locale[locale].credentials);
}

function queryAmazon (locale, idChunkIndex) {

  var products = amazon.locale[locale].ids;

  /**
   * Wait for all promises to complete.
   */

  Promise.all(products.map(function(key, idChunkIndex, array) {

    /**
     * Create new promise and query Amazon based on the 10 product
     * id json chunk.
     */

    return new Promise(function (resolve, reject) {
      amazon.clients[locale]
      .itemLookup(bootstrap_settings(locale, idChunkIndex), 
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
    return flattenJSON(results, locale);
  })

 /**
   * Store the result in Redis.
   */

  .then(function(flattenedResult) {
    saveToRedis(locale, flattenedResult)
  })

  /**
   * Catch all errors
   */

  .catch(function (error) {
    console.log('Error querying Amazon - ', error);
  });
}

function saveToRedis (locale, flattenedResult) {
  return new Promise(function (resolve, reject) {
    r.set(locale, flattenedResult, function(err, reply) {
      if (err) { reject(err) } 
      else {
        resolve(reply);
      }
    });
  });
}

createClients('UK');
queryAmazon('UK');

module.exports = amazon;
