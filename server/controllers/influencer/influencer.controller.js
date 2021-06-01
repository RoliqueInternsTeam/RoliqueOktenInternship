const uuid = require('uuid');
const { influencerServices, instagramServices, cleanObjectService } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');
const { CREATED, OK } = require('../../constants/status-codes');
const s3uploadParams = require('../../helpers/s3.helper');
const { s3Client } = require('../../config/s3.config');

module.exports = {
    createInfluencer: async (req, res, next) => {
        try {
            const { avatar, user, influencer } = req;

            if (influencer.social.instagram.instagramUsername) {
                await instagramServices.getInstagramAccount(influencer);
            }
            await cleanObjectService.cleanObject(influencer);

            const newInfluencer = await influencerServices.createInfluencer({ userId: user._id, ...influencer });
            const { _id } = newInfluencer;

            if (avatar && !influencer.avatar) {
                const fileExtension = avatar.name.split('.').pop();

                s3uploadParams.Key = `influencers/${_id}/${uuid.v1()}.${fileExtension}`;
                s3uploadParams.Body = avatar.data;

                await s3Client.upload(s3uploadParams, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await influencerServices.addPhotoInfluencer(_id, locationUrl);
                });
            }

            res.status(CREATED).json('Influencer created');
        } catch (e) {
            next(e);
        }
    },

    updateInfluencer: async (req, res, next) => {
        try {
            const { avatar, influencer } = req;
            const { _id } = influencer;

            if (avatar) {
                const fileExtension = avatar.name.split('.').pop();

                s3uploadParams.Key = `influencers/${_id}/${uuid.v1()}.${fileExtension}`;
                s3uploadParams.Body = avatar.data;

                await s3Client.upload(s3uploadParams, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await influencerServices.addPhotoInfluencer(_id, locationUrl);
                });
            }

            await cleanObjectService.cleanObject(influencer);

            const updateInfluencer = await influencerServices.updateInfluencer(_id, { ...influencer });

            res.status(OK).json(updateInfluencer);
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
