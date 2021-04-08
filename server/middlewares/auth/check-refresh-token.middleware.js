const jwt = require('jsonwebtoken');

const { authServices } = require('../../services');
const { config: { REFRESH_TOKEN_SECRET } } = require('../../config');
const { AUTHORIZATION } = require('../../constants/constants');
const { ErrorHandler, errors } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const refresh_token = req.get(AUTHORIZATION);

        if (!refresh_token) {
            throw new ErrorHandler(errors.NOT_TOKEN.message, errors.NOT_TOKEN.code);
        }

        jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err) => {
            if (err) {
                throw new ErrorHandler(errors.NOT_VALID_REFRESH_TOKEN.message, errors.NOT_VALID_REFRESH_TOKEN.code);
            }
        });
        const isTokenExist = await authServices.getRefreshTokensByParams({ refresh_token });

        if (!isTokenExist) {
            throw new ErrorHandler(errors.NOT_VALID_REFRESH_TOKEN.message, errors.NOT_VALID_REFRESH_TOKEN.code);
        }
        req.token = isTokenExist;

        next();
    } catch (e) {
        next(e);
    }
};
