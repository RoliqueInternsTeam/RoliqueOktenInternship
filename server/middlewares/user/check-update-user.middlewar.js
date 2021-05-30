const { updateUserValidator } = require('../../validators/user');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const updateUser = req.body;
        const { error } = updateUserValidator.validate(updateUser);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        req.updateUser = updateUser;
        next();
    } catch (e) {
        next(e);
    }
};
