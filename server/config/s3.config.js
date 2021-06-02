const AWS = require('aws-sdk');

module.exports = {
    s3Client: new AWS.S3({
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
        region: process.env.REGION
    })
};
