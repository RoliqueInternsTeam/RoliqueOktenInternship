const InfluencerModel = require('../../dataBase/models/Influencer');

module.exports = {
    // findUserByParams: (params) => UserModel.findOne(params),
    //
    // findUserById: (userId) => UserModel.findById(userId),
    //
    createInfluencer: (influencer) => new InfluencerModel(influencer).save(),
    //
    addPhotoInfluencer: (userId, photo) => InfluencerModel.findByIdAndUpdate({ _id: userId },
        { avatar: photo }),
    //
    // updateUser: (userId, data) => UserModel.findByIdAndUpdate({ _id: userId },
    //     { ...data }),
    //
    // getUsers: () => UserModel.find({})
};
