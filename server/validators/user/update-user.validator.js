const Joi = require('joi');

const {
    EMAIL, PASSWORD, NAME, PHONE
} = require('../../config/regexp.enum');

module.exports = Joi.object({
    email: Joi.string().trim().regex(EMAIL),
    password: Joi.string().trim().regex(PASSWORD),
    role: Joi.string(),
    firstName: Joi.string().trim().regex(NAME),
    lastName: Joi.string().trim().regex(NAME),
    phone: Joi.string().regex(PHONE)
});