const { influencerServices, instagramServices } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');
const { s3 } = require('../../config/s3.config');
const { CREATED, OK } = require('../../constants/status-codes');

module.exports = {
    createInfluencer: async (req, res, next) => {
        try {
            const { avatar, user, influencer } = req;

            if (influencer.social.instagram.instagramUsername) {
                await instagramServices.getInstagramAccount(influencer);
            }

            const newInfluencer = await influencerServices.createInfluencer({ userId: user._id, ...influencer });
            if (avatar && !influencer.avatar) {
                const { s3Client } = s3;
                const params = s3.uploadParams;
                const fileExtension = avatar.name.split('.').pop();

                params.Key = `${await newInfluencer._id}.${fileExtension}`;
                params.Body = avatar.data;

                s3Client.upload(params, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await influencerServices.addPhotoInfluencer(newInfluencer._id, locationUrl);
                });
            }

            res.status(CREATED).json('Influencer created');
        } catch (e) {
            next(e);
        }
    },

    updateInfluencer: async (req, res, next) => {
        try {
            const updateInfluencer = req.body;
            const { avatar } = req;
            const { id } = req.params;

            const newData = updateInfluencer.json;

            console.log(newData);
            if (avatar) {
                const { s3Client } = s3;
                const params = s3.uploadParams;
                const fileExtension = avatar.name.split('.').pop();

                params.Key = `${id}.${fileExtension}`;
                params.Body = avatar.data;

                s3Client.upload(params, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await influencerServices.addPhotoInfluencer(id, locationUrl);
                });
            }

            await influencerServices.updateInfluencer(id, { newData });

            res.status(OK).json('Influencer updated');
        } catch (e) {
            next(e);
        }
    },
    getAllInfluencers: async (req, res, next) => {
        try {
            const influencers = await influencerServices.getInfluencers();

            res.json(influencers);
        } catch (e) {
            next(e);
        }
    },
    getOneInfluencer: async (req, res, next) => {
        try {
            const { id } = req.params;

            const influencer = await influencerServices.findInfluencerById(id);

            res.json(influencer);
        } catch (e) {
            next(e);
        }
    }
};
