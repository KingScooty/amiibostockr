'use strict';
var assert = require("chai").assert;

var _ = require('lodash');
var O = require('observed');

/*
  Journey:

  1. Create Client
  2. Query Amazon
  3. Merge response chunks into one object
  4. Clean response
  5. Save response

  Required parts:

  - Create client
  - Query Amazon
  - Merge chunks
  - appropriateAPI

*/

describe('Pub Sub functionality', function() {

  describe('', function () {

    /*

    http://stackoverflow.com/questions/4441798/how-to-use-redis-publish-subscribe-with-nodejs-to-notify-clients-when-data-value

    */

    var redis = require("redis"),
        client1 = redis.createClient(),
        client2 = redis.createClient();

    before(function () {

    })

    it('should publish changes to redis', function (done) {

      client1.on("message", function(channel, message){
        console.log(channel + ": " + message);
        assert(true);
        done();
      });

      client1.on("subscribe", function (channel, count) {
        client2.publish("pubsub", "I am sending a message.");
      });

      setTimeout(function() {
        client1.subscribe("pubsub");
      }, 25);

    });

  });

});
