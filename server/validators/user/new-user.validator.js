const Joi = require('joi');

const {
    EMAIL, PASSWORD, NAME, PHONE
} = require('../../config/regexp.enum');

module.exports = Joi.object({
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().regex(PASSWORD).required(),
    role: Joi.string().required(),
    firstName: Joi.string().trim().regex(NAME).required(),
    lastName: Joi.string().trim().regex(NAME).required(),
    phone: Joi.string().regex(PHONE).allow(''),
    avatar: Joi.string().allow(null, '')
});
