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
    ]),

    // getRefreshTokensByParams: (refreshToken) => O_AuthModel.aggregate([
    //     {
    //         $match: {
    //             refresh_token: refreshToken
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'users',
    //             localField: 'userId',
    //             foreignField: '_id',
    //             as: 'user'
    //         }
    //     },
    //     {
    //         $project: {
    //             refresh_token: 1,
    //             user: {
    //                 $arrayElemAt: [
    //                     '$user',
    //                     0
    //                 ]
    //             }
    //         }
    //     },
    //     {
    //         $project: {
    //             refresh_token: 1,
    //             user: {
    //                 _id: 1,
    //                 role: 1
    //             }
    //         }
    //     }
    // ]),
    getRefreshTokensByParams: (refreshToken) => O_AuthModel.findOne(refreshToken),

    deleteByParams: (params) => O_AuthModel.findOneAndDelete(params)
};
