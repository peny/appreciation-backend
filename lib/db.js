var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log('db open!');
});
var appreciationSchema = mongoose.Schema({
	HITid: String,
	imageurl: String,
	price: String,
	storeId: String,
	accessToken: String,
	storedashboardurl: String,
	cardSent: Boolean
});

var Apprectiation = mongoose.model('Appreciation', appreciationSchema);

var createAppreciation = function(data){
console.log('this is the data the item is being created with', data);
	var appreciation = new Apprectiation(data);	
	console.log('this is iabotu to be saved', appreciation);
	appreciation.save();
};

var findAppreciation = function(data, callback){
	
	Apprectiation.find(function(err,res){
//console.log(err,res)
});
	Apprectiation.find({HITid: data.HITid}, function(err, appreciations){
		callback(err, appreciations);
	});
};

module.exports.createAppreciation = createAppreciation;
module.exports.findAppreciation = findAppreciation;
