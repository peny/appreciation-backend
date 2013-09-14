var fs = require('fs');
var mturk = require('mturk');
var settings = require('../settings.js');

var AMT = require('amt');
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

fs.readFile('views/question.xml','utf-8',function(err,questionXML){
var price = new Price("2.50", "USD");
var title = "Touch Your Toes";
var description = "Exercise is good for you!";
var duration = 60 * 10; // #seconds Worker has to complete after accepting
var options = { keywords: "fitness, health", autoApprovalDelayInSeconds: 3600 };
HITType.create(title, description, price, duration, options, function(err, hitType) {
    console.log("Created HITType "+hitType.id);

    // 2. Render the Question XML
    var options = {'question': "What's your favorite color?"};
        console.log("Rendered XML: "+questionXML);

        // 3. Create a HIT
        var options = {maxAssignments: 5}
        var lifeTimeInSeconds = 3600; // 1 hour
        HIT.create(hitType.id, questionXML, lifeTimeInSeconds, {}, function(err, hit){
            console.log("Created HIT "+hit.id);
        });
    });
});
