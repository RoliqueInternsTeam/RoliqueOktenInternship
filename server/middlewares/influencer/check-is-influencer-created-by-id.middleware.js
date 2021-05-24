const { influencerServices } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id === '' || id == null) {
            throw new ErrorHandler(errors.INFLUENCER_NOT_FOUND.message, errors.INFLUENCER_NOT_FOUND.code);
        }

        const findInfluencer = await influencerServices.findInfluencerById(id);

        if (!findInfluencer) {
            throw new ErrorHandler(errors.INFLUENCER_NOT_FOUND.message, errors.INFLUENCER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
