const userValidator = require('../../validators/user/new-user.validator');
const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const createUser = req.body;
        const { error } = userValidator.validate(createUser);

        if (error) {
            throw new ErrorHandler(errors.NOT_VALID_BODY.message, errors.NOT_VALID_BODY.code);
        }

        req.createUser = createUser;
        next();
    } catch (e) {
        next(e);
    }
};
