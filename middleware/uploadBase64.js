const fs = require('fs');
const AWS = require('aws-sdk');



import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3'
import createSchoolOnboardingForm from '../controller/Forms/schoolOnboardingForms/createSchoolOnboardingForm';



dotenv.config();
const uploadBase64 = (req, res, next) => {


const s3 = new AWS.S3({
    accessKeyId: process.env.AWSACCESSKEY,
    secretAccessKey: process.env.AWSSECRETKEY
});
console.log(req.body)
if(req.body.header.logo){

    const base64Image = req.body.header.logo;
    const fileName = Date.now().toString();
    
    const imageBuffer = Buffer.from(base64Image, 'base64');
    
    const uploadParams = {
      Bucket: process.env.AWSBUCKETNAME,
      Key: fileName,
      Body: imageBuffer
    };
    
    s3.upload(uploadParams, (error, req) => {
      if (error) {
        console.error('Error uploading image to AWS S3:', error);
      } else {
        console.log('Image uploaded successfully.');
        console.log('Public URL:', req.Location);
next();

      }
    });


}




}
export default uploadBase64;
