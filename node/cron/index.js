var CronJob = require('cron').CronJob;

/**

- Multiple locales
- Grab the locale settings
- Bootstrap the settings and config to create an amazon query
- Cron the amazon query every 10 seconds
- Return that data as a json payload

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
