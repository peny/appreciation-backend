var fs = require('fs');
var mturk = require('mturk');
var tictail = require('./tictail');
var db = require('./db');
var ejs = require('ejs');
var settings = require('../settings.js');

var config = {
  url: "https://mechanicalturk.sandbox.amazonaws.com",
  receptor: { port: 8080, host: undefined },
  poller: { frequency_ms: 10000 },
  accessKeyId: settings.amazon.accessKeyId,
  secretAccessKey: settings.amazon.secretAccessKey
};
var mturk = require('mturk')(config);
var Price = mturk.Price;
var HITType = mturk.HITType;
var HIT = mturk.HIT;

var createHIT = function(data){
  var price = new Price("0.50", "USD");
  var title = "Value an item";
  var description = "Value the item in the image, set t";
  var duration = 60 * 10; // #seconds Worker has to complete after accepting
  var options = { keywords: "price, valueate, appreciate, value, cost, money, picture, image", autoApprovalDelayInSeconds: 3600 };
  HITType.create(title, description, price, duration, options, function(err, hitType) {

    var options = {
      'id': Math.floor(Math.random()*10000),
      'questionname': "How much could someone pay for this item (in USD)?",
      'imageurl' : 'http://aprc.se:8042/'+data.imageurl
    };
    templateFile = 'views/question.xml';
    ejs.renderFile(templateFile, options, function(err, questionXML) {


      var _options = {maxAssignments: 1}
      var lifeTimeInSeconds = 3600; // 1 hour
      HIT.create(hitType.id, questionXML, lifeTimeInSeconds, _options, function(err, hit){
		if(err){
			console.log(err);
		} else {
			console.log(options,data);
			var appreciationData = {
				HITid: options.id,
				imageurl: options.imageurl,
				storeId: data.storeid,
				accessToken: data.accesstoken,
				storedashboardurl: data.storedashboardurl,	
				cardSent: false,
			};
			db.createAppreciation(appreciationData);
		}
      });
    });
  });

  mturk.on('HITReviewable', function(hitId) {
    HIT.getAssignments(hitId, {}, function(err, numResults, totalNumResults, pageNumber, assignments) {
	if(assignments && assignments.length){
      		assignments.forEach(function(assignment) {
		db.findAppreciation({HITid: assignment.answer.QuestionFormAnswers.Answer.QuestionIdentifier}, function(err,res){
			if(res.length > 0 && res[0].cardSent === false && res[0].storeId){
			res[0].cardSent = true;
			res[0].price = assignment.answer.QuestionFormAnswers.Answer.FreeText;
			res[0].save();
				tictail.createCard(res[0]);
			} else if(res.length > 0 && res[0].cardSent === true){
				console.log(res[0].price);
			}
		});

      });
	}
    });
  });
};

module.exports.createHIT = createHIT;
