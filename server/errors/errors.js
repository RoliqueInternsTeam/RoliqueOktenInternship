const { BAD_REQUEST, OK, } = require('../config/errors-codes');

module.exports = {
    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Email or password is not valid',
        code: BAD_REQUEST
    },

    LOGIN: {
        message: 'User logged in',
        code: OK
    }
};
