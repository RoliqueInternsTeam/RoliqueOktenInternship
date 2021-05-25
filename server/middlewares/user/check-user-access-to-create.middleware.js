const { ErrorHandler, errors } = require('../../errors');
const { MANAGER, ADMIN } = require('../../constants/constants');

module.exports = (req, res, next) => {
    try {
        const createUser = req.body;
        const { user } = req;

        if (user.role === MANAGER && createUser.role === ADMIN) {
            throw new ErrorHandler(errors.ACCESS_DENIED.message, errors.ACCESS_DENIED.code);
        }
        next();
    } catch (e) {
        next(e);
    }
};
