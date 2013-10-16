var wrapped = [];
var agent = require('webkit-devtools-agent');

function WrapRequest(req) {
  var wrap = this;
  this.body = [];
  req.on('data', function(chunk) {
    wrap.body.push(chunk);
  });
}

require('http')
  .createServer(function handleRequest(req, res) {
    wrapped.push(new WrapRequest(req));
    res.end('GOODBYE');
  })
  .listen(25000)
  .on('listening', function() {
    console.log('Leaky server listening on ' + JSON.stringify(this.address()));
  });