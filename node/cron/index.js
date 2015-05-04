'use strict';
var CronJob = require('cron').CronJob;
var amazon = require('./amazon');
var redis = require('./redis');

var Redis = require('ioredis');
var r = new Redis();

var job;
var init;

console.log('Running index...');

require('./twitter');

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
// var publisher = require('./publisher');

//
job = new CronJob({
  cronTime: '*/20 * * * * *',
  onTick: function callback() {
    console.log('running cron');
    amazon.init('UK').then(function callback(response) {
      redis.process_data(response);
    });
    // queryAmazon('US');
  },
  start: false,
  timeZone: 'Europe/London'
});


init = function init() {
  console.log('Initialising...');
  r.flushall().then(function callback() {
    console.log('Db flushed, starting job...');
    job.start();
  });
};

init();
