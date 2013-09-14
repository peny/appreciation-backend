var fs = require('fs');

var mechaturk = require('../lib/mechaturk.js');

function renderIndex(req,res){
  var _this = this;

  res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
    res.end(JSON.stringify(data));
}

function renderStaticFile(req,res){
	//THis is as dumb as it gets, I'm sorry.
	console.log(req.path);
	var filename = req.path.match(/\/[^\/]+$/);

	
	fs.readFile('uploads'+filename, function(err,file){
console.log(err);
		res.write(file);
	});
}

function saveAppreciationRequest(req, res){
    var _this = this;
console.log(req.files);
fs.readFile(req.files.images.path, function (err, data) {
  var newPath = "uploads/"+req.files.images.name;
  fs.writeFile(newPath, data, function (err) {
  });
});

    console.log(req);
	console.log(req.files);
    mechaturk.createHIT({});
  res.writeHead(200,{'Content-Type': 'text/html; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
   res.end('<h1>OK! YOU\'RE DONE</h1>');
}

module.exports.renderIndex = renderIndex;
module.exports.saveAppreciationRequest = saveAppreciationRequest;
module.exports.renderStaticFile = renderStaticFile;
