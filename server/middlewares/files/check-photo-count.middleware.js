const { ErrorHandler, errors } = require('../../errors');

module.exports = (req, res, next) => {
    if (req.photos.length > 1) {
        throw new ErrorHandler(errors.JUST_ONE_PHOTO.message, errors.JUST_ONE_PHOTO.code);
    }

    next();
};
