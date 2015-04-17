var Twit = require('twit');
var fs = require('fs');


var stock = require('../cron/stock').STOCK;

/**
 * Auth
 */

var T = new Twit({
    consumer_key:         'jlA7DILS4ptyFhYeKi4Q6Nyvg'
  , consumer_secret:      'ff7GtK7xlesqTSos0FFjNH5O0QxBkOCpzLgcRQABick0fWmg5R'
  , access_token:         '3158926131-lV92fP4XNKlifJTPxcwCU49g0ka9U3ZLK0EpSte'
  , access_token_secret:  '6DIRiHcG0KoGMj81cQ0HszBbFX5KIGsfIiYXqphRikPtK'
});


function tweet (name, link, locale) {
  var tweetString = "Head's up! " + name + " is now in stock on the " + locale + " store! #amiibo " + link;

  T.post('statuses/update', { status: tweetString }, function(err, data, response) {
    console.log(data)
  });
}

module.exports = tweet;

/*
var b64content = fs.readFileSync('./media/UKB00Q6A57J2.jpg', { encoding: 'base64' })

// first we must post the media to Twitter
T.post('media/upload', { media: b64content }, function (err, data, response) {

  // now we can reference the media and post a tweet (media will attach to the tweet)
  var mediaIdStr = data.media_id_string
  var params = { status: 'loving life #nofilter', media_ids: [mediaIdStr] }

  T.post('statuses/update', params, function (err, data, response) {
    console.log(data)
  })
})
*/