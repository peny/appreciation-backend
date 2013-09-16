var request = require('request');

var createCard = function(data){
  var json = {
    title: 'Your product has been valued',
    action: data.storedashboardurl+'/product/create',
    card_type: 'media',
    content: {
      header: 'Your product is now valued!',
      caption: 'We estimated the price to '+data.price+' (USD)',
      image: data.imageurl
    }
  };

  var options = {
    json: json,
    headers: {
      'Authorization' : 'Bearer '+data.accessToken,
      'Content-Type': 'application/json',
      'Accept':	'application/json'
    }
  };

  console.log(options);
  request.post('https://api.tictail.com/v1/stores/'+data.storeId+'/cards',options,function(r,e,s){console.log(s)});
}

var getUser = function(data,callback){

  var options = {
    headers: {
      'Authorization' : 'Bearer '+data.accessToken,
      'Content-Type': 'application/json',
      'Accept':	'application/json'
    }
  };

  request.get('https://api.tictail.com/v1/me',options,function(r,body){
	callback(body);
  });
}

module.exports.createCard = createCard;
module.exports.getUser = getUser;
