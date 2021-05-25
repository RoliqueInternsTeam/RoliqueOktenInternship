module.exports = {
    authServices: require('./auth/auth.service'),
    userServices: require('./user/user.service'),
    influencerServices: require('./influencer/influencer.service'),
    instagramServices: require('./instagram/instagram.service'),
    cleanObjectService: require('./object/cleanObject.service'),
    s3Service: require('./s3/s3.service')
};
