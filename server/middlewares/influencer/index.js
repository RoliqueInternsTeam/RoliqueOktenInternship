module.exports = {
    checkInfluencerValid: require('./check-influencer-valid.middleware'),
    checkInformationInfluencer: require('./check-information-influencer.middleware'),
    checkInfluencerById: require('./check-is-influencer-created-by-id.middleware'),
    checkUpdateInfluencerValid: require('./check-update-influencer-valid.middleware')
};
