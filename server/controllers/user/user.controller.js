const passwordHash = require('../../helpers/password.helper');
const { userServices, cleanObjectService, s3Service: { uploadUserPhoto } } = require('../../services');
const { CREATED, OK } = require('../../constants/status-codes');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, createUser } = req;
            const passwordHashed = await passwordHash.hash(createUser.password);

            Object.assign(createUser, { password: passwordHashed });

            await cleanObjectService.cleanObject(createUser);

            const newUser = await userServices.createUser(createUser);

            if (avatar) {
                await uploadUserPhoto(newUser._id, avatar);
            }

            res.status(CREATED).json(newUser);
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { avatar, updateUser } = req;
            const { _id } = updateUser;

            await cleanObjectService.cleanObject(updateUser);
            if (avatar) {
                await uploadUserPhoto(_id, avatar);
            }
            if (updateUser.password) {
                updateUser.password = await passwordHash.hash(updateUser.password);
                const newUpdateUser = await userServices.updateUser(_id, { ...updateUser });
                return res.status(OK).json(newUpdateUser).end();
            }

            const newUpdateUser = await userServices.updateUser(_id, { ...updateUser });

            res.status(OK).json(newUpdateUser);
        } catch (e) {
            next(e);
        }
    },
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userServices.getUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userServices.findUserById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

};
