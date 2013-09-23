var express = require('express');
var router = require('./routes/main.js');
var app = express();
app.configure(function(){
    app.use(express.bodyParser());
    app.use('/media', express.static(__dirname + '/media'));
    app.use(express.static(__dirname + '/public'));
});

app.post('/appreciation', function(req, res){
	router.saveAppreciationRequest(req,res);
});

app.listen(8042);
