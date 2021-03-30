const { ErrorHandler, errors } = require('../../errors');
const userService = require('../../services/user/user.service');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.findUserByParams({ email });

        if (user) {
            throw new ErrorHandler(errors.EMAIL_ALREADY_EXIST.message, errors.EMAIL_ALREADY_EXIST.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
