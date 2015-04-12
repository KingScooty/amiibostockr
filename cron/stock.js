var amazon = require('./amazon').amazon;
var settings = require('../app/settings');
var O = require('observed');
var _ = require('lodash');
var STOCK = bootstrapStock();

/**
 * Bootstrap the stockstate to the locale ASIN objects
 */
function bootstrapStock () {
  var STOCK = {};

  settings.locales.forEach(function(locale, index, array) {
    STOCK[locale] = amazon.locale[locale].ASIN;
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

var resetStockValues = function (hash) {
  return Object.keys(hash).map(function(value, index) {
    hash[value] = false;
  });
}

var updateStock = function (locale, payload) {

  var ASIN = _.flattenDeep(productsInStock(payload));

  _.map(STOCK[locale], function (index, key, array) {

    if(_.includes(ASIN, key)) {
      array[key] = true;
    } else {
      array[key] = false
    }
  });

}


module.exports = {
  STOCK: STOCK,
  productsInStock: productsInStock,
  resetStockValues: resetStockValues,
  updateStock: updateStock
}