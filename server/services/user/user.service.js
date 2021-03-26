const UserModel = require('../../dataBase/models/User');

module.exports = {
    findUserByParams: (params) => UserModel.findOne(params),

    createUser: (user) => new UserModel(user).save()
};
