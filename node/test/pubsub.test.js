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
  describe('Redis testing', function() {
    /*

    http://stackoverflow.com/questions/4441798/how-to-use-redis-publish-subscribe-with-nodejs-to-notify-clients-when-data-value

    */

    // var redis = require('redis');
    // var client1 = redis.createClient();
    // var client2 = redis.createClient();
    // var client3 = redis.createClient();

    it('should publish changes to redis', function() {

      // client1.on("message", function(channel, message){
      //   // console.log(channel + ": " + message);
      //   assert(true);
      //   done();
      // });
      //
      // client1.on("subscribe", function (channel, count) {
      //   client2.publish("pubsub", "I am sending a message.");
      // });
      //
      // setTimeout(function() {
      //   client1.subscribe("pubsub");
      // }, 25);

    });

    it('should generator a redis stock table', function() {
      // Set a key to filter out the true 'in stock' products

      /*
      # get the 10 newest users
      keys = redis.lrange('users:newest', 0, 10)
      #multi get the actual 10 user objects
      redis.mget(*keys)
      */

      // var response = [
      //   {
      //     'ASIN': 1,
      //     'inStock': false
      //   },
      //   {
      //     'ASIN': 2,
      //     'inStock': true
      //   },
      //   {
      //     'ASIN': 3,
      //     'inStock': false
      //   }
      // ]
      //
      // client3.hmset("product:1", {
      //   "ASIN": '01',
      //   "is_in_stock": true,
      //   'all_fields': JSON.stringify({'title': 'some title', 'price': '10.99'})
      // }, function(err, response) {
      //   console.log(response);
      // });
      //
      // client3.hmset("product:2", {
      //   "ASIN": '02',
      //   "is_in_stock": false,
      //   'all_fields': JSON.stringify({'title': 'some title', 'price': '5.99'})
      // }, function(err, response) {
      //   console.log(response);
      // });

      // Maintain an in_stock table with ASINs in_stock matching to true
      //client.sadd('is_in_stock', ASIN)

      // client3.sadd("saddkey", "saddvalue1", redis.print); // Set the value in key in a list
      // client3.sadd("saddkey", "saddvalue2", redis.print);
      //
      // client3.smembers("saddkey", function (err, replies) {
      //     if (err) {
      //         return console.error("error response - " + err);
      //     }
      //
      //     console.log(replies.length + " replies:");
      //     replies.forEach(function (reply, i) {
      //         console.log("    " + i + ": " + reply);
      //     });
      // });



      // Object.keys(products).map(function(key, index) {
      //  console.log("product:"+index);
      //  client3.set("product:"+index, products[key], function(err, obj) {
      //    console.log(obj)
      //  });
      //
      // //  client3.sadd("product", );
      // });
      //
      // console.log('RESPONSE:');
      //
      // client3.get('product:1', function(err, response) {
      //   console.log(response);
      // });

    });
  });
});
