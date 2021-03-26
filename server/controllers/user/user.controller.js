const uuid = require('uuid').v1();
const fs = require('fs-extra').promises;
const path = require('path');

const passwordHash = require('../../helpers/password.helper');
const userService = require('../../services/user/user.service');
const { CREATED } = require('../../config/errors-codes');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const [avatar] = req.photos;

            user.password = await passwordHash.hash(user.password);
            const newUser = await userService.createUser(user);
            if (avatar) {
                const photoDir = `users/${newUser._id}/photos`;
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;

                await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), { recursive: true });
                await avatar.mv(path.resolve(process.cwd(), 'public', photoDir, photoName));

                await userService.updateUser(newUser._id, `${photoDir}/${photoName}`);
            }

            res.status(CREATED).json('User created');
        } catch (e) {
            next(e);
        }
    },
};
