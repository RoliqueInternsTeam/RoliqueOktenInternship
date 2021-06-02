const {
    BAD_REQUEST,
    UNAUTHORIZED,
    NOT_FOUND,
    FORBIDDEN
} = require('../constants/status-codes');

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
    UPLOAD_IMAGE_ERROR: {
        message: 'Error occurred while trying to upload to S3 bucket',
        code: BAD_REQUEST
    },
    NOT_TOKEN: {
        message: 'Not token',
        code: BAD_REQUEST
    },
    WRONG_BUDGET: {
        message: 'Wrong  total budget campaign',
        code: BAD_REQUEST
    },
    BRAND_ALREADY_EXIST: {
        message: 'Brand already exist',
        code: BAD_REQUEST
    },

    // UNAUTHORIZED
    NOT_VALID_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },
    NOT_VALID_REFRESH_TOKEN: {
        message: 'Not valid token',
        code: UNAUTHORIZED
    },

    // NOT FOUND
    USER_NOT_FOUND: {
        message: 'User not found',
        code: NOT_FOUND
    },
    INFLUENCER_NOT_FOUND: {
        message: 'Influencer not found',
        code: NOT_FOUND
    },
    CAMPAIGN_NOT_FOUND: {
        message: 'Campaign not found',
        code: NOT_FOUND
    },
    // FORBIDDEN
    ACCESS_DENIED: {
        message: 'Access denied',
        code: FORBIDDEN
    },

};
