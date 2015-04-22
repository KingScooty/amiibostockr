var CronJob = require('cron').CronJob;

/**

- Multiple locales
- Grab the locale settings
- Bootstrap the settings and config to create an amazon query
- Cron the amazon query every 10 seconds
- Return that data as a json payload

*/

/*

http://redis.io/topics/notifications

amazon.init('UK').then(function(response) {
  redis.process_data(response);
});

// amazon.init('US').then(function(response) {
//   redis.process_process_stock_table(response.in_stock_table);
//   redis.process_products_table(response.product_table);
// });

init
  populate the stock table
  populate the persistent product table

update stock table
  remove out of stock
  add in stock

*/

// var queryAmazon = require('./amazon').initAmazon;
var publisher = require('./publisher');

var job = new CronJob({
  cronTime: '*/20 * * * * *',
  onTick: function () {
    // queryAmazon('UK');
    // queryAmazon('US');
  },
  start: false,
  timeZone: 'Europe/London'
});

job.start();
