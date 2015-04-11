var amazon = require('amazon-product-api');
var util = require('util');
var Promise = require('bluebird');

// 4.5 calls per UK
// 3 calls per US
// = 7.5 calls.

var settings = require('../app/settings');
var amazonLocale = {};

/**
 * Load in the required files based on the locale settings in app
 * e.g. UK, US
 */ 

settings.locales.forEach(function(el, index, array) {
  amazonLocale[el] = require('./' + el);
});

var clients = {};
var r = require('./redis');


function queryAmazon() {

  Object.keys(amazonLocale).forEach(function(key, index, array) {

    var key = key;

    /**
     * Creates a client from credentials
     * Need one of these for each locale
     */
    clients[key] = amazon.createClient(amazonLocale[key].credentials);

    /**
     * Lookup settings object needs to be built/bootstrapped.
     * It needs to be generated 4 times for UK, and 3 for US
     * Quantity is determined by number of ID chunks per locale.
     */

    /**
     * Analyse ID chunks in locale.
     */

    amazonLocale[key].ids.forEach(function(el, index, array) {

      var thisIndex = index;

      var lookUpSettings = {
        idType: 'ASIN',
        Condition: 'New',
        includeReviewsSummary: false,
        itemId: amazonLocale[key].ids[index].toString(),
        // responseGroup: 'ItemAttributes,Offers,Images',
        domain: amazonLocale[key].domain
      }

      /**
       * Run lookup for each ID chunk.
       */

      clients[key].itemLookup(lookUpSettings, 
        function(err, results) {
        
        if (err) {
          console.log(util.inspect(err, false, null));
        } else {

          // Save to Redis with the locale as key
          /** 
           * Need to be able to return a promise here, once the data is placed 
           * somewhere.
           */ 

           console.log(util.inspect(results, false, null));
           console.log(',');

/* 
          console.log(key + thisIndex);
          r.set(key + thisIndex, JSON.stringify(results), function(err, reply) {
            console.log(reply);
          });
*/
        }
      });
    });

  });

}
// queryAmazon();
module.exports = queryAmazon;

