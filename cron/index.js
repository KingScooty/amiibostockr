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

Object.keys(amazonLocale).forEach(function(el, index, array) {
  clients[el] = amazon.createClient(amazonLocale[el].credentials);
});
//

amazonLocale.UK.ids.forEach(function(el, index, array) {
  var lookUpSettings = {
    idType: 'ASIN',
    Condition: 'New',
    includeReviewsSummary: false,
    itemId: amazonLocale.UK.ids[index].toString(),
    responseGroup: 'ItemAttributes',
    domain: amazonLocale.UK.domain
  }

  clients.UK.itemLookup(lookUpSettings, 
    function(err, results) {
    if (err) {
      console.log(util.inspect(err, false, null));
    } else {
      console.log('');
      console.log('');
      console.log('LOOKUP NUMBER: ' + index + ' of ' + array.length);
      console.log('');
      console.log('');
      // console.log(util.inspect(results, false, null));
      console.log('');
      console.log('');
      console.log('');
    }
  });
});

// Changes 4 times for UK
// var lookUpSettings = {
//   idType: 'ASIN',
//   Condition: 'New',
//   includeReviewsSummary: false,
//   itemId: amazonLocale.UK.ids[0].toString(),
//   responseGroup: 'ItemAttributes,Offers,Images',
//   domain: amazonLocale.UK.domain
// }

//Needs to be called 4 times
// clients.UK.itemLookup(lookUpSettings, 
//   function(err, results) {
//   if (err) {
//     console.log(util.inspect(err, false, null));
//   } else {
//     console.log(util.inspect(results, false, null));
//   }
// });