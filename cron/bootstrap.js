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

/**
 * Lookup settings object needs to be built/bootstrapped
 * It needs to be generated 4 times for UK, and 3 for US
 * Quantity is determined by number of ID chunks per locale.
 */
var lookUpSettings = {
  idType: 'ASIN',
  Condition: 'New',
  includeReviewsSummary: false,
  itemId: amazonLocale.UK.ids[1].toString(),
  responseGroup: 'ItemAttributes,Offers,Images',
  domain: amazonLocale.UK.domain
}





// amazonLocals.forEach(function(el, index, array) {
// });




/**
 * Creates a client from credentials
 * Need one of these for each locale
 */
var client = amazon.createClient(amazonLocale.UK.credentials);

/**
 * Loops up and returns payload for specific query
 * Called by a cron job, and uses locale settings
 */
client.itemLookup(lookUpSettings, 
  function(err, results) {
  if (err) {
    console.log(util.inspect(err, false, null));
  } else {
    console.log(util.inspect(results, false, null));
  }
});
