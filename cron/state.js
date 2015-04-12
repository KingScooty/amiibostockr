var amazon = require('./amazon').amazon;
var settings = require('../app/settings');

var STOCKSTATE = {};

/**
 * Bootstrap the stockstate to the locale ASIN objects
 */

settings.locales.forEach(function(locale, index, array) {
  STOCKSTATE[locale] = amazon.locale[locale].ASIN;
}); 

module.exports = STOCKSTATE;