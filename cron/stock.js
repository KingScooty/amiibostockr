var amazon = require('./amazon').amazon;
var settings = require('../app/settings');
var O = require('observed');
var _ = require('lodash');
var STOCK = buildStockObject();

// STOCK = {
//   UK : {
//     'B00PG6ZDPK': {

//     }
//   }
// }

/*
UK: [
  { 
    ASIN: 'B00PG6ZDPK',
    inStock: false,
    name: '',
    link: '',
    price: '',
    img: [],
  },
]
*/

/**
 * Bootstrap the stockstate to the locale ASIN objects
 */
function buildStockObject () {
  var STOCK = {};

  // settings.locales.forEach(function(locale, index, array) {
  //   STOCK[locale] = {
  //     amazon.locale[locale].ASIN
  //   }
  // });

  settings.locales.forEach(function(locale, index, array) {

    STOCK[locale] = [];

    amazon.locale[locale].ASIN.map(function (value, index, array) {

      var productArgs = {
        ASIN: value,
        inStock: false,
        name: '',
        price: 0,
        img: []
      }

      STOCK[locale].push(productArgs);
    });
  });

  return STOCK;
}

var productsInStock = function (payload) {

  return _.pluck(_.filter(payload, { 
    "Offers": [
      {
        "TotalOffers": ["1"]
      }
    ]
  }), "ASIN");

}

var resetStockValues = function (products) {
  return products.map(function(product, index) {
    product.inStock = false;
  });
}

var updateStock = function (locale, payload) {

  var ASIN = _.flattenDeep(productsInStock(payload));

  _.map(STOCK[locale], function (product, key, array) {

    // if(_.includes(ASIN, key)) {
    //   array[key] = true;
    // } else {
    //   array[key] = false
    // }
    if (_.includes(ASIN, product.ASIN)) {
      product.inStock = true;
    } else {
      product.inStock = false;
    }

  });

}


module.exports = {
  STOCK: STOCK,
  productsInStock: productsInStock,
  resetStockValues: resetStockValues,
  updateStock: updateStock
}