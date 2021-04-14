const Joi = require('joi');

const {
    EMAIL, PASSWORD, NAME, PHONE
} = require('../../config/regexp.enum');

module.exports = Joi.object({
    _id: Joi.string(),
    __v: Joi.string(),
    email: Joi.string().trim().regex(EMAIL).allow(''),
    password: Joi.string().trim().regex(PASSWORD).allow(''),
    role: Joi.string().allow(''),
    firstName: Joi.string().trim().regex(NAME).allow(''),
    lastName: Joi.string().trim().regex(NAME).allow(''),
    phone: Joi.string().regex(PHONE).allow(''),
    avatar: Joi.string().allow('')
});
