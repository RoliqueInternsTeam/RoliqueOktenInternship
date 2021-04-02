const uuid = require('uuid').v1();
const fs = require('fs-extra').promises;
const path = require('path');

const passwordHash = require('../../helpers/password.helper');
const userService = require('../../services/user/user.service');
const { CREATED } = require('../../constants/status-codes');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            const [avatar] = req.photos;

            user.password = await passwordHash.hash(user.password);
            const newUser = await userService.createUser(user);
            if (avatar) {
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const avatarPathWithoutPublic = path.join('users', `${newUser._id}`, 'photos');
                const avatarFullPath = path.join(process.cwd(), 'public', avatarPathWithoutPublic);
                const photoPath = path.join(avatarPathWithoutPublic, photoName);

                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, photoName));

                await userService.addPhotoUser(newUser._id, photoPath);
            }

            res.status(CREATED).json('User created');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const updateUser = req.body;
            const [avatar] = req.photos;
            const { id } = req.params;
            if (avatar) {
                const fileExtension = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileExtension}`;
                const avatarPathWithoutPublic = path.join('users', `${id}`, 'photos');
                const w = path.join('users', `${id}`);
                const avatarFullPath = path.join(process.cwd(), 'public', avatarPathWithoutPublic);
                const photoPath = path.join(avatarPathWithoutPublic, photoName);

                await fs.rmdir(path.join(avatarPathWithoutPublic), { recursive: true });
                await fs.mkdir(path.join(avatarFullPath), { recursive: true });
                await avatar.mv(path.join(avatarFullPath, photoName));

                await userService.addPhotoUser(id, { photo: photoPath });
            }
            const db = await userService.updateUser(id, { ...updateUser }, false);

            res.status(CREATED).json(db);
        } catch (e) {
            next(e);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },


};
