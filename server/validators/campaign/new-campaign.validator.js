const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().trim().required(),
    status: Joi.string().trim().required(),
    effort: Joi.string().trim().required(),
    startDate: Joi.date().allow(''),
    endDate: Joi.date().allow(''),
    hashtags: Joi.array().items(Joi.string()),
    brand: Joi.string().trim().required(),
    teamLead: Joi.string().required(),
    campaignLogo: Joi.string().allow(null, ''),
    clientDescription: Joi.string(),
    internalNotes: Joi.string(),
    budgetsTargets: Joi.object().keys({
        totalBudget: Joi.number(),
        budgets: Joi.object().keys({
            youtubeUsername: Joi.string().allow(''),
            youtubeFollowers: Joi.number().when(
                'youtubeUsername', {
                    is: '', then: Joi.any().valid(''), otherwise: Joi.number().required()
                }
            )
        }),

    })
});
