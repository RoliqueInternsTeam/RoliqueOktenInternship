const passwordHelper = require('../../helpers/password.helper');
const userService = require('../../services/user/user.service');
const { ErrorHandler, errors: { WRONG_EMAIL_OR_PASSWORD } } = require('../../errors');

module.exports = {
    checkPasswordHash: async (req, res, next) => {
        try {
            const { password, email } = req.body;

            const user = await userService.findUserByParams({ email });

            if (!user) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.code);
            }

            await passwordHelper.compare(password, user.password);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
