const UserModel = require('../../dataBase/models/User');

module.exports = {
    findUserByParams: (params) => UserModel.findOne(params),

    findUserById: (userId) => UserModel.findById(userId),

    createUser: (user) => new UserModel(user).save(),

    addPhotoUser: (userId, photo) => UserModel.findByIdAndUpdate({ _id: userId },
        { avatar: photo }),

    updateUser: (userId, data) => UserModel.findByIdAndUpdate({ _id: userId },
        { ...data }),

    getUsers: () => UserModel.find({})
};
