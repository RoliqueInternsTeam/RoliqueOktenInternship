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
    clientDescription: Joi.string().allow(''),
    internalNotes: Joi.string().allow(''),
    budgetsTargets: Joi.object().keys({
        totalBudget: Joi.number(),
        budgets: Joi.object({
            influencerBudget: Joi.number(),
            socialAdsMediaBudget: Joi.number(),
            productionBudget: Joi.number(),
            travelBudget: Joi.number(),
            handlingFee: Joi.number(),
            otherBudget: Joi.number(),
        }).when('totalBudget', {
            is: Joi.exist(),
            then: Joi.object({
                influencerBudget: Joi.allow('').required(),
                socialAdsMediaBudget: Joi.allow('').required(),
                productionBudget: Joi.allow('').required(),
                travelBudget: Joi.allow('').required(),
                handlingFee: Joi.allow('').required(),
                otherBudget: Joi.allow('').required(),
            })
        }),

    })
});
