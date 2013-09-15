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
  var appreciation = new Apprectiation(data);
  appreciation.save();
};

var getQuota = function(storeid){
  Apprectiation.find({storeId : storeid}, function(err,res){
	console.log('this store has done '+res.length+' requests');
  });
};

var findAppreciation = function(data, callback){

  Apprectiation.find({HITid: data.HITid}, function(err, appreciations){
    callback(err, appreciations);
  });
};

module.exports.createAppreciation = createAppreciation;
module.exports.findAppreciation = findAppreciation;
module.exports.getQuota = getQuota;
