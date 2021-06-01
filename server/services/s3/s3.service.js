const uuid = require('uuid');
const s3uploadParams = require('../../helpers/s3.helper');
const { ErrorHandler, errors } = require('../../errors');
const { influencerServices, userServices } = require('../index');
const { s3Client } = require('../../config/s3.config');

module.exports = {
    uploadInfluencerPhoto: async (influencerId, avatar) => {
        try {
            const fileExtension = avatar.name.split('.').pop();

            s3uploadParams.Key = `${influencerId}.${fileExtension}`;
            s3uploadParams.Body = avatar.data;

            await s3Client.upload(s3uploadParams, async (err, data) => {
                if (err) {
                    throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                }

                const locationUrl = data.Location;

                await influencerServices.addPhotoInfluencer(influencerId, locationUrl);
            });
        } catch (e) {
            console.log(e);
        }
    },
    uploadUserPhoto: (userId, avatar) => {
        const fileExtension = avatar.name.split('.').pop();

        s3uploadParams.Key = `users/${userId}/${uuid.v1()}.${fileExtension}`;
        s3uploadParams.Body = avatar.data;

        s3Client.upload(s3uploadParams, async (err, data) => {
            if (err) {
                throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
            }

            await userServices.addPhotoUser(userId, data.Location);
        });
    }
};
