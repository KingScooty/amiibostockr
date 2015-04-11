var amazon = require('amazon-product-api');
var util = require('util');

/**

- Multiple locales
- Grab the locale settings
- Bootstrap the settings and config to create an amazon query
- Cron the amazon query every 10 seconds
- Return that data as a json payload

*/

var queryAmazon = require('./amazon');
queryAmazon();

