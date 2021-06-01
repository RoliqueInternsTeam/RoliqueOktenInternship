const s3uploadParams = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET_NAME,
    Key: '',
    Body: null
};

module.exports = s3uploadParams;
