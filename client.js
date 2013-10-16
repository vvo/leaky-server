var MAX_REQUEST = process.argv[2];
var queue = require('async').queue(req, 5);

for(var i = 0; i < MAX_REQUEST; i++) {
  queue.push({
    url: 'http://localhost:25000',
    body: (new Buffer(1000 * 10)).toString(),
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

