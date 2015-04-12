var settings = require('./settings/settings');
var productTable = buildProductTable();
var inStockTable = buildStockTable();

/**
 * Bootstrap the stockstate to the locale ASIN objects
 */

function buildProductTable () {
  var stock = {};

  settings.locales.forEach(function(locale, index, array) {
    stock[locale] = [];
  });

  return stock;
}

function buildStockTable () {
  var stock = {};

  settings.locales.forEach(function(locale, index, array) {
    stock[locale] = {};
  });

  return stock;
}


module.exports = {
  inStockTable: inStockTable,
  productTable: productTable
}















/*
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

  var availableProducts = _.flattenDeep(productsInStock(payload));

  _.map(STOCK[locale], function (product, key, array) {

    if (_.includes(availableProducts, product.ASIN)) {
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
*/