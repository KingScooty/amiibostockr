var redis = require('redis');
r = redis.createClient();

r.on("error", function (err) {
    console.log("Error " + err);
});

module.exports = r;