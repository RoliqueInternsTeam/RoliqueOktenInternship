const { ErrorHandler, errors } = require('../../errors');

module.exports = (whoHaveAccess = []) => (req, res, next) => {
    try {
        const { user } = req.user;

        if (!whoHaveAccess.length) {
            return next();
        }

        if (!whoHaveAccess.includes(user.role)) {
            throw new ErrorHandler(errors.ACCESS_DENIED.message, errors.ACCESS_DENIED.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
