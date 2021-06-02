const Joi = require('joi');

const { NAME } = require('../../config/regexp.enum');

module.exports = Joi.object({
    name: Joi.string().trim().regex(NAME).required(),
    avatar: Joi.string().allow(null, ''),
});
