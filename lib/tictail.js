var request = require('request');

var createCard = function(data){


		var form = {
		title: 'Product has been valued',
		action: data.storedashboardurl+'/product/create',
		card_type: 'media',
		content: {
			header: 'Your product is now valued!', 
			caption: 'We estimated the price to '+data.price,
			image: data.imageurl
		}
		};

	var options = {
		json: form,
		headers: {
		'Authorization' : 'Bearer accesstoken_G9KCCcV3N6ia4M9ZT4N64yFaD4YKHs',
		'Content-Type': 'application/json',
		'Accept':	'application/json'
		}
	};

	console.log(options);
	request.post('https://api.tictail.com/v1/stores/'+data.storeId+'/cards',options,function(r,e,s){console.log(s)});
}

module.exports.createCard = createCard;
