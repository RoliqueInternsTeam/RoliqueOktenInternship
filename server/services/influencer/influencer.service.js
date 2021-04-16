const InfluencerModel = require('../../dataBase/models/Influencer');

module.exports = {
    // findUserByParams: (params) => UserModel.findOne(params),
    //
    findInfluencerById: (userId) => InfluencerModel.findById(userId),
    //
    createInfluencer: (influencer) => new InfluencerModel(influencer).save(),
    //
    addPhotoInfluencer: (userId, photo) => InfluencerModel.findByIdAndUpdate({ _id: userId },
        { avatar: photo }),
    //
    updateInfluencer: (userId, data) => InfluencerModel.findByIdAndUpdate({ _id: userId },
        { ...data }),

    getInfluencers: () => InfluencerModel.find({})
};
