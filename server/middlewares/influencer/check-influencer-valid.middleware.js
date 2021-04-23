const { newInfluencerValidator } = require('../../validators/influencer');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const influencer = JSON.parse(req.body.json);

        const { error } = newInfluencerValidator.validate(influencer);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
