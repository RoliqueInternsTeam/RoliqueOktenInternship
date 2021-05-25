const { updateInfluencerValidator } = require('../../validators/influencer');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const updateInfluencer = JSON.parse(req.body.json);

        const { error } = updateInfluencerValidator.validate(updateInfluencer);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        req.influencer = updateInfluencer;
        next();
    } catch (e) {
        next(e);
    }
};
