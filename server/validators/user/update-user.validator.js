const Joi = require('joi');

const {
    EMAIL, PASSWORD, NAME, PHONE
} = require('../../config/regexp.enum');

module.exports = Joi.object({
    _id: Joi.string(),
    __v: Joi.string(),
    email: Joi.string().trim().regex(EMAIL),
    password: Joi.string().trim().regex(PASSWORD).allow(''),
    role: Joi.string(),
    firstName: Joi.string().trim().regex(NAME),
    lastName: Joi.string().trim().regex(NAME),
    phone: Joi.string().regex(PHONE).allow(''),
    avatar: Joi.string().allow('')
});
