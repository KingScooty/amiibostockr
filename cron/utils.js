var _ = require('lodash');

exports.flattenJSON = function (payload) {
  return _.flatten(payload);
}

// exports.resetStockValues = function (hash) {
//   return Object.keys(hash).map(function(value, index) {
//     hash[value] = false;
//   });
// }

// exports.productsInStock = function (payload) {

//   return _.pluck(_.filter(payload, { 
//     "Offers": [
//       {
//         "TotalOffers": ["1"]
//       }
//     ]
//   }), "ASIN");

// }

