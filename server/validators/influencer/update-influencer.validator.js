const Joi = require('joi');

const { NAME } = require('../../config/regexp.enum');

module.exports = Joi.object({
    firstName: Joi.string().trim().regex(NAME),
    lastName: Joi.string().trim().regex(NAME),
    birthdate: Joi.date().allow('', null),
    profession: Joi.string().trim(),
    socialProfileInstagram: Joi.string().allow('', null),
    instagramFollowers: Joi.number().when(
        'socialProfileInstagram', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileYouTube: Joi.string().allow('', null),
    youTubeFollowers: Joi.number().when(
        'socialProfileYouTube', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileFacebook: Joi.string().allow('', null),
    facebookFollowers: Joi.number().when(
        'socialProfileFacebook', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileTiktok: Joi.string().allow('', null),
    tiktokFollowers: Joi.number().when(
        'socialProfileTiktok', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileTwitter: Joi.string().allow('', null),
    twitterFollowers: Joi.number().when(
        'socialProfileTwitter', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileBlog: Joi.string().allow('', null),
    blogFollowers: Joi.number().when(
        'socialProfileBlog', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
});
