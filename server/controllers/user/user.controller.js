const uuid = require('uuid');
const passwordHash = require('../../helpers/password.helper');
const { userServices, cleanObjectService } = require('../../services');
const { CREATED, OK } = require('../../constants/status-codes');
const s3uploadParams = require('../../helpers/s3.helper');
const { ErrorHandler, errors } = require('../../errors');
const { s3Client } = require('../../config/s3.config');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, createUser } = req;
            const passwordHashed = await passwordHash.hash(createUser.password);

            Object.assign(createUser, { password: passwordHashed });

            await cleanObjectService.cleanObject(createUser);

            const newUser = await userServices.createUser(createUser);
            const { _id } = newUser;

            if (avatar) {
                const fileExtension = avatar.name.split('.').pop();

                s3uploadParams.Key = `users/${_id}/${uuid.v1()}.${fileExtension}`;
                s3uploadParams.Body = avatar.data;

                await s3Client.upload(s3uploadParams, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    await userServices.addPhotoUser(_id, data.Location);
                });
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
                const fileExtension = avatar.name.split('.').pop();

                s3uploadParams.Key = `users/${_id}/${uuid.v1()}.${fileExtension}`;
                s3uploadParams.Body = avatar.data;

                await s3Client.upload(s3uploadParams, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    await userServices.addPhotoUser(_id, data.Location);
                });
            }

            if (updateUser.password) {
                updateUser.password = await passwordHash.hash(updateUser.password);
                const newUpdateUser = await userServices.updateUser(_id, { ...updateUser });
                return res.status(OK).json(newUpdateUser).end();
            }

            if (!updateUser.phone) {
                updateUser.phone = '';
                await userServices.updateUser(_id, { ...updateUser });
                return res.status(OK).json('User updated').end();
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
