const { userServices } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (id === '') {
            throw new ErrorHandler(errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
        }

        const findUser = await userServices.findUserById(id);

        if (!findUser) {
            throw new ErrorHandler(errors.USER_NOT_FOUND.message, errors.USER_NOT_FOUND.code);
        }

        req.findUser = findUser;
        next();
    } catch (e) {
        next(e);
    }
};
