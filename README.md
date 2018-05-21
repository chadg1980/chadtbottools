## Chatbot Tools
This software is suppose to make is easier and more secure for the people that are working on the behind the scenes of the chatbot. 

## Motivation
The Subject Matter Experts (SME) are continually adding information, images, and video to the chatbot. The images and videos needed to be uploaded to an AWS S3 bucket to be consumed by the chatbot. The file names from the uploaded files need to match what is written when the chat bot is in use. 

### Details
AWS IAM permissions are granted for the users that need to be able to upload images and videos. 
A Chrome extention is used for a front end for the SME to upload the images, using the IAM permissions. 
When a new image or video  is written to the S3 bucket, that triggers a lambda function to write the file name in the Airtable. 
When the SME uses the image column, the file name that is in the airtable is checked agaist the file name the SME is is writing. 
If the file exists, they get a green check, if not, and 'X'
This was created because the Data Scientist was spending more than 2 hours trying to find where there was a type in a file name. 

## Technology Used
* AWS IAM 
* AWS S3
* AWS Lambda + Node.js
* [Airtable](https://airtable.com/)
