const campaignValidator = require('../../validators/campaign/new-campaign.validator');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const createCampaign = req.body;
        const { error } = campaignValidator.validate(createCampaign);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        req.createCampaign = createCampaign;
        next();
    } catch (e) {
        next(e);
    }
};
