var http = require('http');
var request = require('request');
var router = require('./routes/main.js');

http.createServer(function(req, res){
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err){
    if(err){
      res.writeHead(500);
      res.end();
    }
  });
}).listen(8042,'0.0.0.0');
