const { ErrorHandler, errors: { NOT_VALID_BODY } } = require('../../errors');
const userValidator = require('../../validators/user/userValidator');

module.exports = (req, res, next) => {
    try {
        const { error } = userValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(error.details[0].message, NOT_VALID_BODY);
        }

        next();
    } catch (e) {
        next(e);
    }
};
