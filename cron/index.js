var CronJob = require('cron').CronJob;

/**

- Multiple locales
- Grab the locale settings
- Bootstrap the settings and config to create an amazon query
- Cron the amazon query every 10 seconds
- Return that data as a json payload

*/

var queryAmazon = require('./amazon').initAmazon;
// queryAmazon('UK');

// var job = require('./cron').job;
// var job().start(queryAmazon('UK'));

// var CronJob = require('cron').CronJob;


var job = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function () {
    queryAmazon('UK');
  },
  start: false,
  timeZone: 'Europe/London'
});

job.start();