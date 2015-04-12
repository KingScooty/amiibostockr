var _ = require('lodash');

exports.flattenJSON = function (payload) {
  return _.flatten(payload);
}

exports.bakeACake = function () {
  console.log('The cake is backing!');
}

exports.productsInStock = function (payload) {

  // return _.filter(payload, { 
  //   "Offers": [
  //     {
  //       "TotalOffers": ["1"]
  //     }
  //   ]
  // });

  return _.pluck(_.filter(payload, { 
    "Offers": [
      {
        "TotalOffers": ["1"]
      }
    ]
  }), "ASIN");

}

