const Joi = require('joi');

const { EMAIL, PASSWORD } = require('../../config/regexp.enum');

module.exports = Joi.object({
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().regex(PASSWORD).required(),
    role: Joi.string(),
    firstname: Joi.string().max(30),
    lastname: Joi.string().max(30)
});
