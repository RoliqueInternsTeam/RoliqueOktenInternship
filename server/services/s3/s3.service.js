const { ErrorHandler, errors } = require('../../errors');
const { influencerServices, userServices } = require('../index');
const { s3 } = require('../../config/s3.config');

const uploadInfluencerPhoto = (influencerId, avatar) => {
    try {
        const { s3Client } = s3;
        const params = s3.uploadParams;
        const fileExtension = avatar.name.split('.').pop();

        params.Key = `${influencerId}.${fileExtension}`;
        params.Body = avatar.data;

        s3Client.upload(params, async (err, data) => {
            if (err) {
                throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
            }

            const locationUrl = data.Location;

            await influencerServices.addPhotoInfluencer(influencerId, locationUrl);
        });
    } catch (e) {
        console.log(e);
    }
};
const uploadUserPhoto = (userId, avatar) => {
    try {
        const { s3Client } = s3;
        const params = s3.uploadParams;
        const fileExtension = avatar.name.split('.').pop();

        params.Key = `${userId}.${fileExtension}`;
        params.Body = avatar.data;

        s3Client.upload(params, async (err, data) => {
            if (err) {
                throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
            }

            const locationUrl = data.Location;

            await userServices.addPhotoUser(userId, locationUrl);
        });
    } catch (e) {
        console.log(e);
    }
};
module.exports = { uploadInfluencerPhoto, uploadUserPhoto };
