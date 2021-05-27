const passwordHash = require('../../helpers/password.helper');
const { userServices, cleanObjectService } = require('../../services');
const { ErrorHandler, errors } = require('../../errors');
const { s3 } = require('../../config/s3.config');
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
                const { s3Client } = s3;
                const params = s3.uploadParams;
                const fileExtension = avatar.name.split('.').pop();

                params.Key = `${await newUser._id}.${fileExtension}`;
                params.Body = avatar.data;

                s3Client.upload(params, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await userServices.addPhotoUser(newUser._id, locationUrl);
                });
            }

            res.status(CREATED).json('User created');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const { avatar, updateUser } = req;
            const { id } = req.params;

            await cleanObjectService.cleanObject(updateUser);
            if (avatar) {
                const { s3Client } = s3;
                const params = s3.uploadParams;
                const fileExtension = avatar.name.split('.').pop();

                params.Key = `1.${fileExtension}`;
                params.Body = avatar.data;

                s3Client.upload(params, async (err, data) => {
                    if (err) {
                        throw new ErrorHandler(errors.UPLOAD_IMAGE_ERROR.message, errors.UPLOAD_IMAGE_ERROR.code);
                    }

                    const locationUrl = data.Location;

                    await userServices.addPhotoUser(id, locationUrl);
                });
            }
            if (updateUser.password) {
                updateUser.password = await passwordHash.hash(updateUser.password);
                await userServices.updateUser(id, { ...updateUser });
                return res.status(OK).json('User updated').end();
            }

            await userServices.updateUser(id, { ...updateUser });

            res.status(OK).json('User updated');
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
