'use strict';
const AWS = require('aws-sdk');
const fileType = require('file-type');
const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1'});

function getParams(image_name_ext, data, imageContentType){

    let params = {
        Bucket: "coachpic.healthlate.com", 
        Key:  image_name_ext, 
        Body: data, 
        ContentType: imageContentType
        
    };
    return params;
}

exports.handler = (event, context, callback) => {

    let bodyBuffer = new Buffer(event['body-json'].toString(), base64);
    let boundry = multipart.getBoundry(event.params.header['content-type']);
    let parts = multipart.Parse(bodyBuffer, boundry);
    callback(null, { result : 'SUCCESS', files : parts } );
    /*
    let this_id = -1;
    this_id = event.coachid_internal;
    const req = event;
    const operation = req.operation;
    let height = 200;
    let width = 200;
    let imageData;
    
    let fileName = "coachid_" +this_id; 
    let imageContentType;
    let image_name_ext
    delete req.operation;

    //Only continue if their is a valid base64Image in the body. 
    if (!req.base64Image) {
        const msg = 'Invalid resize request: no "base64Image" field supplied';
        console.log(msg);
        return callback(msg);
    }

    //get the params for s3
    let file_params = getParams(image_name_ext, data, imageContentType);
    var putObjectPromise = s3.putObject(file_params).promise();
    putObjectPromise.then( data => {

        console.log("s3 data");
        console.log(data);
        console.log("successfully upladed the image");
        callback(null, "https://s3.amazonaws.com/coachpic.healthlate.com/"+image_name_ext);
    }).catch( err => {
        console.log("s3 error: " + err);
        //console.log("Error uploading data: ", data);
        callback(null, err);
    })

     
*/
       
    
};