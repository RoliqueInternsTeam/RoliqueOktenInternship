const Joi = require('joi');

const { EMAIL, PASSWORD, NAME } = require('../../config/regexp.enum');

module.exports = Joi.object({
    email: Joi.string().trim().regex(EMAIL).required(),
    password: Joi.string().trim().regex(PASSWORD).required(),
    role: Joi.string().required(),
    firstname: Joi.string().trim().regex(NAME).required(),
    lastname: Joi.string().trim().regex(NAME).required(),
    phone: Joi.number()
});
