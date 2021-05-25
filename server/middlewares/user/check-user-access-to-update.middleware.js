const { ErrorHandler, errors } = require('../../errors');
const { MANAGER, ADMIN } = require('../../constants/constants');

module.exports = (req, res, next) => {
    try {
        const updateUser = req.body;
        const { findUser, user } = req;

        if (user.role === MANAGER && findUser.role === ADMIN) {
            throw new ErrorHandler(errors.ACCESS_DENIED.message, errors.ACCESS_DENIED.code);
        }

        if (user.role === MANAGER && updateUser.role === ADMIN) {
            throw new ErrorHandler(errors.ACCESS_DENIED.message, errors.ACCESS_DENIED.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
