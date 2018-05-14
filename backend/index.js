'use strict';
const AWS = require('aws-sdk');
//const fileType = require('file-type');
const multipart = require('aws-lambda-multipart-parser');
const s3 = new AWS.S3({apiVersion: '2006-03-01', region: 'us-east-1'});

function getParams(image_name_ext, data, imageContentType){
    let bucketname = "coachpic.healthlate.com"
    /*
    based on the file 
        if image file
            bucketname = "images.chatbot"
        else if video file
            bucketname = "videos.chatbot"
        else
            unknown file extention
            exit without saving to s3
    */
    let params = {
        Bucket: bucketname, 
        Key:  image_name_ext, 
        Body: data, 
        ContentType: imageContentType
        
    };
    return params;
    
}


exports.handler = (event, context, callback) => {
    
    let req = event.body;
    let mpart = multipart.parse(event, true);
    console.log(mpart);
    let filename = mpart["file"].filename;
    let imageContentType = mpart["file"].contentType;
    console.log(filename);
    let data = JSON.stringify(mpart["file"].content);
    
    const base64Data = new Buffer(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64')
    console.log(base64Data);
    
    let file_params = getParams(filename, data, imageContentType)
    let putObjectPromise = s3.putObject(file_params).promise();
        putObjectPromise.then( data => {

            console.log("s3 data");
            console.log(data);
            console.log("successfully upladed the image");
            callback(null, "uploaded : coachpic.healthlate.com/" + filename);

        }).catch( err => {
            console.log("s3 error: " + err);
            //console.log("Error uploading data: ", data);
            callback(null, err);
        })
    
    callback(null, {"event" : "success"}  );

    

    /*if (!req.base64Image) {
        const msg = 'Invalid resize request: no "base64Image" field supplied';
        console.log(msg);
        return callback(msg);
    }*/

    //get the params for s3
    /*
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
    })*/
    

   
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

     
*/
       
    
};