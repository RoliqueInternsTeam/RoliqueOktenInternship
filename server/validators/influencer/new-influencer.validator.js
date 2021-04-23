const Joi = require('joi');

const { NAME } = require('../../config/regexp.enum');

module.exports = Joi.object({
    firstName: Joi.string().trim().regex(NAME).required(),
    lastName: Joi.string().trim().regex(NAME).required(),
    birthdate: Joi.date().allow(''),
    profession: Joi.string().trim().required(),
    avatar: Joi.string().allow(null, ''),
    social: Joi.object().keys({
        instagram: Joi.object().keys({
            instagramUsername: Joi.string().allow(''),
            instagramFollowers: Joi.number().when(
                'instagramUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),
        youtube: Joi.object().keys({
            youtubeUsername: Joi.string().allow(''),
            youtubeFollowers: Joi.number().when(
                'youtubeUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),
        facebook: Joi.object().keys({
            facebookUsername: Joi.string().allow(''),
            facebookFollowers: Joi.number().when(
                'facebookUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),
        tiktok: Joi.object().keys({
            tiktokUsername: Joi.string().allow(''),
            tiktokFollowers: Joi.number().when(
                'tiktokUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),
        twitter: Joi.object().keys({
            twitterUsername: Joi.string().allow(''),
            twitterFollowers: Joi.number().when(
                'twitterUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),
        blog: Joi.object().keys({
            blogUsername: Joi.string().allow(''),
            blogFollowers: Joi.number().when(
                'blogUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        })
    })
});
