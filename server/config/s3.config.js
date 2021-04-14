const AWS = require('aws-sdk');

const s3Client = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    region: process.env.REGION
});

const uploadParams = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET_NAME,
    Key: '',
    Body: null
};

module.exports = {
    s3:
      {
          s3Client,
          uploadParams
      }
};
