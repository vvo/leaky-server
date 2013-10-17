var LRU = require("lru-cache")
var bodyCache = LRU(500);
var agent = require('webkit-devtools-agent');

function decodeBody(req, cb) {
  var cached = {
    body: ''
  };

  req.on('data', function(chunk) {
    cached.body += chunk.toString();
  });

  return cached;
}

require('http')
  .createServer(function handleRequest(req, res) {
    bodyCache.set(req.url, decodeBody(req));

    res.end('GOODBYE');
  })
  .listen(25000)
  .on('listening', function() {
    console.log('Leaky server listening on ' + JSON.stringify(this.address()));
  });