var amazon = require('amazon-product-api');
var util = require('util');


var client = amazon.createClient({
  awsId: process.env.AWSID,
  awsSecret: process.env.AWSSECRET,
  awsTag: "kings0b-21"
});

var UK = require('./uk');
var US = require('./us');

console.log(UK.ids[2].toString());

// console.log((UK.ids[1].toString()));

var lookUpSettings = {
  idType: 'ASIN',
  Condition: 'New',
  includeReviewsSummary: false,
  itemId: (UK.ids[1].toString()),
  responseGroup: 'ItemAttributes,Offers,Images',
  domain: UK.domain
}

console.log('');
console.log('ITEM IDS:');
console.log(lookUpSettings.itemId);
console.log('');


client.itemLookup(lookUpSettings, 
  function(err, results) {
  if (err) {
    console.log(util.inspect(err, false, null));
  } else {
    console.log(util.inspect(results, false, null));
  }
});

// 4.5 calls per UK
// 3 calls per US
// = 7.5 calls.