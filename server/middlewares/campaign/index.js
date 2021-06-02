module.exports = {
    checkBudget: require('./check-campaign-budget.middleware'),
    checkIsBrandCreated: require('./check-is-brand-created'),
    checkCampaignValid: require('./chek-campaign-valid.middleware'),
    checkBrandValid: require('./check-brand-valid.middleware'),
    checkCampaignById: require('./check-is-campaign-created-by-id.middleware'),
};
