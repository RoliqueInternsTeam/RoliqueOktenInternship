const { BAD_REQUEST, UNAUTHORIZED } = require('../constants/status-codes');

module.exports = {
    // BAD REQUEST
    NOT_VALID_BODY: {
        message: 'Request is not valid',
        code: BAD_REQUEST
    },
    WRONG_EMAIL_OR_PASSWORD: {
        message: 'Email or password is not valid',
        code: BAD_REQUEST
    },
    EMAIL_ALREADY_EXIST: {
        message: 'Email already exist',
        code: BAD_REQUEST
    },
    TOO_BIG_FILE: {
        message: 'Too big file',
        code: BAD_REQUEST
    },
    WRONG_FILE_EXTENSION: {
        message: 'Wrong file extension',
        code: BAD_REQUEST
    },
    JUST_ONE_PHOTO: {
        message: 'You can upload just one photo as avatar',
        code: BAD_REQUEST
    },
    NOT_TOKEN: {
        message: 'Not token',
        code: BAD_REQUEST
    },
    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },

};
