var MAX_REQUEST = process.argv[2] || 1;
var queue = require('async').queue(req, 5);
var lorem = require('lorem-ipsum');

for(var i = 0; i < MAX_REQUEST; i++) {
  queue.push({
    url: 'http://localhost:25000/' + getRandomInt(0, 10000),
    body: lorem({
      count: 1000
    }),
  })
}

var check = setInterval(function() {
  process.stdout.write(status() + '\r');
}, 200);

queue.drain = function() {
  clearInterval(check);
  console.log(status());
}

function status() {
  return 'sent ' + (MAX_REQUEST - queue.length()) + '   /    ' + MAX_REQUEST;
}

function req(opt, cb) {
  require('request')
    .post(opt, cb);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}