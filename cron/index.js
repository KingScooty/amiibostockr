var amazon = require('amazon-product-api');
var util = require('util');

/**

- Multiple locales
- Grab the locale settings
- Bootstrap the settings and config to create an amazon query
- Cron the amazon query every 10 seconds
- Return that data as a json payload

*/

var amazonLocale = {
  UK: require('./uk'),
  US: require('./us')
}


//Bootstrapped
var clients = {};

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

    var lookUpSettings = {
      idType: 'ASIN',
      Condition: 'New',
      includeReviewsSummary: false,
      itemId: amazonLocale[key].ids[index].toString(),
      responseGroup: 'ItemAttributes,Offers,Images',
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
        console.log(util.inspect(results, false, null));
      }
    });
  });

});