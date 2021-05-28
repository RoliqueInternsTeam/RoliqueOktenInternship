const { campaignServices, brandService } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');
const { s3 } = require('../../config/s3.config');
const { CREATED } = require('../../constants/status-codes');

module.exports = {
    createCampaign: async (req, res, next) => {
        try {
            const { avatar, user, body } = req;

            const newCampaign = await campaignServices.createCampaign({ userId: user._id, ...body });
            if (avatar) {
                const { s3Client } = s3;
                const params = s3.uploadParams;
                const fileExtension = avatar.name.split('.').pop();

                params.Key = `${await newCampaign._id}.${fileExtension}`;
                params.Body = avatar.data;

                s3Client.upload(params, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await campaignServices.addPhotoCampaign(newCampaign._id, locationUrl);
                });
            }

            res.status(CREATED).json('Campaign created');
        } catch (e) {
            next(e);
        }
    },

    getAllCampaigns: async (req, res, next) => {
        try {
            const campaigns = await campaignServices.getCampaigns();

            res.json(campaigns);
        } catch (e) {
            next(e);
        }
    },

    getOneCampaign: async (req, res, next) => {
        try {
            const { id } = req.params;

            const campaign = await campaignServices.findCampaignByParams(id);

            res.json(campaign);
        } catch (e) {
            next(e);
        }
    },

    getAllBrands: async (req, res, next) => {
        try {
            const brands = await brandService.getBrands();

            res.json(brands);
        } catch (e) {
            next(e);
        }
    },

    createBrand: async (req, res, next) => {
        try {
            const { avatar, user, body } = req;

            const newBrand = await brandService.createBrand({ userId: user._id, ...body });
            if (avatar) {

            }

            res.status(CREATED).json('Brand created');
        } catch (e) {
            next(e);
        }
    },
};
