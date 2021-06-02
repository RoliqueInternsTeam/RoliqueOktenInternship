const brandValidator = require('../../validators/campaign/new-brand.validator');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const createBrand = req.body;
        const { error } = brandValidator.validate(createBrand);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        req.createBrand = createBrand;
        next();
    } catch (e) {
        next(e);
    }
};
