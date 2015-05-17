'use strict';
var Twit = require('twit');
var Redis = require('ioredis');
var determineHost = require('./utils').determineHost;

var r = new Redis({
  host: determineHost(),
  // This is the default value of `retryStrategy`
  retryStrategy: function callback(times) {
    var delay = Math.min(times * 2, 2000);
    return delay;
  }
});
// var fs = require('fs');

/**
 * Auth
 */

var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

r.subscribe('in_stock_changes');

function tweet(name, link, locale) {
  var tweetString = 'Head\'s up! ' + name + ' is now in stock on the ' + locale + ' store! #amiibo ' + link;

  T.post('statuses/update', { status: tweetString }, function callback(err, data, response) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

r.on('message', function callback(channel, message) {
  var in_stock_message = JSON.parse(message);
  console.log('twitter r.on message: ', message);
  console.log('twitter in stock message: ', in_stock_message);
  // console.log('Broadcast:');
  // console.log(in_stock_message);
  r.hgetall('amazon:UK:product_table:' + in_stock_message[0])
  .then(function callback(response) {
    var data = JSON.parse(response);
    console.log('Product in stock!', data);
    console.log('Tweeting!');
    tweet(data.name, data.link, 'UK');
  });
});

// module.exports = tweet;

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
