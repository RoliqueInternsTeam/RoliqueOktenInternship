const Joi = require('joi');

const { NAME } = require('../../config/regexp.enum');

module.exports = Joi.object({
    firstName: Joi.string().trim().regex(NAME).required(),
    lastName: Joi.string().trim().regex(NAME).required(),
    birthdate: Joi.date(),
    profession: Joi.string().trim().required(),
    socialProfileInstagram: Joi.string(),
    instagramFollowers: Joi.number().when(
        'socialProfileInstagram', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileYouTube: Joi.string(),
    youTubeFollowers: Joi.number().when(
        'socialProfileYouTube', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileFacebook: Joi.string(),
    facebookFollowers: Joi.number().when(
        'socialProfileFacebook', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileTiktok: Joi.string(),
    tiktokFollowers: Joi.number().when(
        'socialProfileTiktok', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileTwitter: Joi.string(),
    twitterFollowers: Joi.number().when(
        'socialProfileTwitter', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
    socialProfileBlog: Joi.string(),
    blogFollowers: Joi.number().when(
        'socialProfileBlog', {
            is: Joi.exist(),
            then: Joi.number().required()
        }
    ),
});
