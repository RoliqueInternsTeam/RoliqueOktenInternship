const passwordHash = require('../../helpers/password.helper');
const userService = require('../../services/user/user.service');
const { CREATED } = require('../../config/errors-codes');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = await passwordHash.hash(user.password);
            const newUser = await userService.createUser(user);

            res.status(CREATED).json('User created');
        } catch (e) {
            next(e);
        }
    },
};
