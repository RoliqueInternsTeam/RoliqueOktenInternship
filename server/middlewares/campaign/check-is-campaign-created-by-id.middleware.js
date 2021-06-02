const { campaignServices } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { id } = JSON.parse(req.body.json);

        if (id === '' || id == null) {
            throw new ErrorHandler(errors.CAMPAIGN_NOT_FOUND.message, errors.CAMPAIGN_NOT_FOUND.code);
        }

        const findCampaign = await campaignServices.findCampaignById(id);

        if (!findCampaign) {
            throw new ErrorHandler(errors.INFLUENCER_NOT_FOUND.message, errors.INFLUENCER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
