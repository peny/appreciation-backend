var http = require('http');
var request = require('request');

http.createServer(function(req, res){
		
	request('https://api.github.com/zen', function(error, response, title){
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf8'});
var body = 'JSON (/dʒeɪsɒn/ jay-sawn, /dʒeɪsən/ jay-sun), or JavaScript Object Notation, is a text-based open standard designed for human-readable data interchange. It is derived from the JavaScript scripting language for representing simple data structures and associative arrays, called objects. Despite its relationship to JavaScript, it is language-independent, with parsers available for many languages. The JSON format was originally specified by Douglas Crockford, and is described in RFC 4627. The official Internet media type for JSON is application/json. The JSON filename extension is .json. The JSON format is often used for serializing and transmitting structured data over a network connection. It is used primarily to transmit data between a server and web application, serving as an alternative to XML.';
	var json = {title : title, body: body, price: Math.floor(Math.random()*400)};
		res.end(JSON.stringify(json).toString('utf8'));
	});
}).listen(8042,'162.209.81.76');
