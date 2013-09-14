var fs = require('fs');
var director = require('director');

var mechaturk = require('../lib/mechaturk.js');

function renderIndex(){
  var _this = this;

  _this.res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
    _this.res.end(JSON.stringify(data));
}

function saveAppreciationRequest(){
    var _this = this;
    console.log(_this.res);
    mechaturk.createHIT({});
  _this.res.writeHead(200,{'Content-Type': 'text/html; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
    _this.res.end('<h1>OK! YOU\'RE DONE</h1>');
}

var router = new director.http.Router({
  '/': {
    get: renderIndex
  },
  '/appreciation': {
    get: renderIndex,
    post: saveAppreciationRequest
  }
});

module.exports = router;
