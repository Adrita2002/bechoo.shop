require('dotenv').config();
const aws = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const bucket_name = 'bechoo-images';
const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1',
    signatureVersion: "v4",
  });

 const generatePresignedUrl = async(req,res)=>{
    const fileId = uuidv4()+ ".";
    const fileExtension = req.body.fileExtension;
    const bucket = bucket_name;
    const Key = fileId + fileExtension;
    const contentType = req.body.contentType;
    const params = ({
        Bucket: bucket,
        Key,
       ACL: "public-read",
       ContentType: contentType,
        Expires: 300,
      })
    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL
  }

  module.exports = generatePresignedUrl