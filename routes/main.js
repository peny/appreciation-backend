var fs = require('fs');

var request = require('request');

var mechaturk = require('../lib/mechaturk.js');
var tictail = require('../lib/tictail.js');
var db = require('../lib/db.js');


function saveAppreciationRequest(req, res){
  var _this = this;
  var imagePath = '';

  //Download image from tictail or get image from request
  if(req.body.imageurl){
    var filetype = req.body.imageurl.match(/\..{2,5}$/);
    imagePath = "media/"+((new Date()).getTime())+filetype;
    request(req.body.imageurl).pipe(fs.createWriteStream(imagePath));
  } else {
    var filetype = req.files.images.name.match(/\..{2,5}$/);
    imagePath = "media/"+((new Date()).getTime())+filetype;
    fs.readFile(req.files.images.path, function (err, data) {
      fs.writeFile(imagePath, data, function (err) {
      });
    });
  }

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
    } else {
      res.writeHead(403,{'Content-Type': 'text/html; charset=utf8'});
      res.end('<h1>Could not find TicTail user</h1>')
    }
  });
}

module.exports.saveAppreciationRequest = saveAppreciationRequest;
