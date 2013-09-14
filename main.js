var express = require('express');
var router = require('./routes/main.js');
var app = express();
app.use(express.bodyParser());



app.get('/appreciation', function(req, res){
	router.renderIndex(req,res);
});

app.get('/uploads/*', function(req, res){
	router.renderStaticFile(req,res);
});

app.post('/appreciation', function(req, res){
	router.saveAppreciationRequest(req,res);
});

app.get('/', function(req, res){
	router.renderIndex(req,res);
});

app.listen(8042);

/*
var http = require('http');
var request = require('request');
var router = require('./routes/main.js');
var union = require('union');

var server = union.createServer({
before: [	
	function(req, res){
	  var found = router.dispatch(req, res);
		if(!found){
	res.emit('next');
}
	}
]
});
server.listen(8042);*/
