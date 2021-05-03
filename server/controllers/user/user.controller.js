const passwordHash = require('../../helpers/password.helper');
const userService = require('../../services/user/user.service');
const { ErrorHandler, errors } = require('../../errors');
const { s3 } = require('../../config/s3.config');
const { CREATED, OK } = require('../../constants/status-codes');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const { avatar, body: { password } } = req;
            const passwordHashed = await passwordHash.hash(password);

            Object.assign(req.body, { password: passwordHashed });

            const newUser = await userService.createUser(req.body);
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

                    await userService.addPhotoUser(newUser._id, locationUrl);
                });
            }

            res.status(CREATED).json('User created');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            const updateUser = req.body;
            const {
                firstName, lastName, role, email, phone, _id
            } = req.body;
            const updateUserNoPass = {
                firstName, lastName, role, email, phone
            };
            const { avatar } = req;
            // const { id } = req.params;
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

                    await userService.addPhotoUser(_id, locationUrl);
                });
            }
            if (updateUser.password) {
                updateUser.password = await passwordHash.hash(updateUser.password);
                await userService.updateUser(_id, { ...updateUser });
                return res.status(OK).json('User updated').end();
            }

            await userService.updateUser(_id, { ...updateUserNoPass });

            res.status(OK).json('User updated');
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
    getOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await userService.findUserById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }

};
