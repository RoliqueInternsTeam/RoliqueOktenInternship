const O_AuthModel = require('../../dataBase/models/O_Auth');

module.exports = {
    createTokenPair: (tokenPair) => new O_AuthModel(tokenPair).save(),

    getTokensByParams: (token) => O_AuthModel.aggregate([
        {
            $match: {
                access_token: token
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                user: {
                    $arrayElemAt: [
                        '$user',
                        0
                    ]
                }
            }
        },
        {
            $project: {
                user: {
                    _id: 1,
                    role: 1
                }
            }
        }
    ])
};
