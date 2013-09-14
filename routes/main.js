var director = require('director');
var fs = require('fs');

function renderIndex(){
  var _this = this;

  _this.res.writeHead(200,{'Content-Type': 'application/json; charset=utf8'});
    var data = {
        price: Math.floor(Math.random()*600),
    };
    _this.res.end(JSON.stringify(data));
}

var router = new director.http.Router({
  '/': {
    get: renderIndex
  },
  '/site': {
    get: renderIndex
  }
});

module.exports = router;
