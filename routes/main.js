var fs = require('fs');
var director = require('director');

var mechaturk = require('./lib/mechaturk.js');

function renderIndex(){
  var _this = this;

  _this.res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
    _this.res.end(JSON.stringify(data));
}

function saveAppreciationRequest(data){
    var _this = this;
    console.log(data);
    mechaturk.createHIT(data);
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
