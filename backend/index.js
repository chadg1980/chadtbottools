//const async = require('async');
//const AWS = require('aws-sdk');
//const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1'});
const util = require('util');
const Airtable = require('airtable');
var base = new Airtable({apiKey: ''}).base('appazQ1yAI1aqEkEM');

exports.handler = function (event, context, callback) {
    console.log("starting...");
     // Read options from the event.
     /**
      * Uncomment below to see details
      */
     //console.log("Reading options from event:\n", util.inspect(event, {depth: 5})); 
     
    var srcBucket = event.Records[0].s3.bucket.name;
     // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    if(srcBucket == "images.chatbot" || srcBucket == "videos.chatbot"){
        console.log("writing " + srcKey +" to image airtable");
        let currentrecord = "";
        let newrecord = "";
        base('file_name').select({
            //Select top 1 record
            maxRecords: 1,
            
        }).eachPage(function page(records, fetchNextPage){
            records.forEach(function(record){
                 currentrecord = record.get('file_name');
            });

            fetchNextPage();

        }, function done(err){
            if(err){console.error(err)}
            //console.log(currentrecord);
            //console.log(newrecord);
            newrecord = currentrecord +", "+srcKey;
            base('file_name').update('rec07SS71i0qBi8II', {
                "file_name" : newrecord
              }, function(err, record) {
                  if (err) { console.error(err); return; }
                  console.log(record.get('file_name'));
              });
            callback(null, "message");
            
        });
       
    }
    else{
        console.log("Something is wrong, srcKey: "+ srcKey + " is not going to the airtable");
    }

   
    callback(null, "message");
};
