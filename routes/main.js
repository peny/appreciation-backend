var fs = require('fs');

var mechaturk = require('../lib/mechaturk.js');
var tictail = require('../lib/tictail.js');
var db = require('../lib/db.js');

function renderIndex(req,res){
  var _this = this;

  res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
  var data = {
    price: Math.floor(Math.random()*600),
  };
  res.end(JSON.stringify(data));
}

function renderStaticFile(req,res){
  //This is as dumb as it gets, I'm sorry.
  console.log(req.path);
  var filename = req.path.match(/\/[^\/]+$/);

  fs.readFile('uploads'+filename, function(err,file){
    console.log(err);
    res.write(file);
  });
}

function saveAppreciationRequest(req, res){
  var _this = this;
	var filetype = req.files.images.name.match(/\..{2,5}$/);
    var imagePath = "uploads/"+((new Date()).getTime())+filetype;
console.log(imagePath);
  fs.readFile(req.files.images.path, function (err, data) {
    fs.writeFile(imagePath, data, function (err) {
    });
  });
  var data = {
    imageurl: imagePath,
    accesstoken: req.body.accesstoken,
    storeid: req.body.storeid,
    storedashboardurl: req.body.storedashboardurl
  };
db.getQuota(data.storeid);
tictail.getUser({accessToken: req.body.accesstoken}, function(err,user){
	if(!err){
  mechaturk.createHIT(data);
  res.writeHead(200,{'Content-Type': 'text/html; charset=utf8'});
  fs.readFile('views/done.html', function(err, html){
    res.end(html);
  });
}
});
}

module.exports.renderIndex = renderIndex;
module.exports.saveAppreciationRequest = saveAppreciationRequest;
module.exports.renderStaticFile = renderStaticFile;
