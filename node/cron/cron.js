var CronJob = require('cron').CronJob;

/*
 * Generate crons based on locales
 */

// runs every 5 seconds
exports.job = function (task) {

  var args = {
    cronTime: '*/5 * * * * *',
    onTick: function () {
      task();
    },
    start: false,
    timeZone: 'Europe/London'
  }

  return new CronJob(args);
}

// job.start('hello');

// function bootstrap_settings (locale) {

//   return {
//     cronTime: '*/5 * * * * *',
//     onTick: function (locale) {
//       console.log(locale);
//     },
//     start: false,
//     timeZone: 'Europe/London'
//   }

// }


// var usjob = new CronJob({
//   cronTime: '*/5 * * * * *',
//   onTick: function () {
//     console.log('US Task running');
//   },
//   start: false,
//   timeZone: 'Europe/London'
// });

// usjob.start();
