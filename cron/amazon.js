var amazon = require('amazon-product-api');
var util = require('util');


var client = amazon.createClient({
  awsId: process.env.AWSID,
  awsSecret: process.env.AWSSECRET,
  awsTag: "kings0b-21"
});

var UK = require('./uk');
var US = require('./us');

// console.log(UK.ids[2].toString());

client.itemLookup({
  idType: 'ASIN',
  Condition: 'New',
  includeReviewsSummary: false,
  // itemId: 'B00N4ABMUA',
  itemId: UK.ids[1].toString(),
  responseGroup: 'ItemAttributes,Offers,Images',
  // domain: 'webservices.amazon.com'
  domain: UK.domain
}, function(err, results) {
  if (err) {
    console.log(util.inspect(err, false, null));
  } else {
    console.log(util.inspect(results, false, null));
  }
});

// 4.5 calls per UK
// 3 calls per US
// = 7.5 calls.

var Amazon = function (meta) {
  var client = amazon.createClient({
    awsId: 
  })
}

module.exports = Amazon;