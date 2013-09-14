var http = require('http');
var request = require('request');
var router = require('./routes/main.js');

http.createServer(function(req, res){

  request('https://api.github.com/zen', function(error, response, title){
    router.dispatch(req, res, function(err){
        if(err){
            res.writeHead(500);
            res.end();
        }
    });
  });
}).listen(8042,'0.0.0.0');
