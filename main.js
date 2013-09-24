var express = require('express');
var router = require('./routes/main.js');
var app = express();

var PORT = 8042;

app.configure(function(){
    app.use(express.bodyParser());
    app.use('/media', express.static(__dirname + '/media'));
    app.use('/public', express.static(__dirname + '/public'));
    app.use('/', express.static(__dirname + '/public'));
});

app.post('/appreciation', function(req, res){
	router.saveAppreciationRequest(req,res);
});

app.listen(PORT);
console.log('server running at port '+PORT);
