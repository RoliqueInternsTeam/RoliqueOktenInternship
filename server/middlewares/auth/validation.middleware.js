const { ErrorHandler, errors } = require('../../errors');
const userValidator = require('../../validators/user/userValidator');

module.exports = (req, res, next) => {
    try {
        const { error } = userValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
