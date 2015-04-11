var CronJob = require('cron').CronJob;

/** 
 * Generate crons based on locales
 */ 

// runs every 5 seconds
var ukjob = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function () {
    
  },
  start: false,
  timeZone: 'Europe/London'
});

ukjob.start();

var usjob = new CronJob({
  cronTime: '*/5 * * * * *',
  onTick: function () {
    console.log('US Task running');
  },
  start: false,
  timeZone: 'Europe/London'
});

usjob.start();