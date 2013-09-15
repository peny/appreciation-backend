var request = require('request');

var createCard = function(data){

  var form = {
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
    json: form,
    headers: {
      'Authorization' : 'Bearer '+data.accessToken,
      'Content-Type': 'application/json',
      'Accept':	'application/json'
    }
  };

  console.log(options);
  request.post('https://api.tictail.com/v1/stores/'+data.storeId+'/cards',options,function(r,e,s){console.log(s)});
}

module.exports.createCard = createCard;
