const O_AuthModel = require('../../dataBase/models/O_Auth');

module.exports = {
    createTokenPair: (tokenPair) => new O_AuthModel(tokenPair).save()
};
