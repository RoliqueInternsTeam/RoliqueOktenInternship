const jwt = require('jsonwebtoken');

const { authServices } = require('../../services');
const { config: { ACCESS_TOKEN_SECRET } } = require('../../config');
const { AUTHORIZATION } = require('../../constants/constants');
const { ErrorHandler, errors } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new ErrorHandler(errors.NOT_TOKEN.message, errors.NOT_TOKEN.code);
        }

        jwt.verify(access_token, ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
            }
        });
        const isTokenExist = await authServices.getTokensByParams({ access_token });

        if (!isTokenExist) {
            throw new ErrorHandler(errors.NOT_VALID_TOKEN.message, errors.NOT_VALID_TOKEN.code);
        }

        req.user = isTokenExist.id;

        next();
    } catch (e) {
        next(e);
    }
};
