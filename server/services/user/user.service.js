const UserModel = require('../../dataBase/models/User');

module.exports = {
    findUserByParams: (params) => UserModel.findOne(params),

    createUser: (user) => new UserModel(user).save(),
    updateUser: (userId, photo) => UserModel.findByIdAndUpdate({ _id: userId },
        { avatar: photo })

};
