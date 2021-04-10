const { Router } = require('express');

const { userController } = require('../../controllers');
const { usersMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');
const { ADMIN, MANAGER } = require('../../constants/constants');

const userRouter = Router();

userRouter.post('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([
        MANAGER,
        ADMIN
    ]),
    usersMiddleware.checkUserValid,
    usersMiddleware.checkUserAccessCreate,
    fileMiddleware.checkFileMiddleware,
    usersMiddleware.checkIsUserCreated,
    fileMiddleware.checkPhotoCountUser,
    userController.createUser);
userRouter.put('/:id',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([
        ADMIN,
        MANAGER
    ]),
    usersMiddleware.checkUserById,
    usersMiddleware.checkUserAccessUpdate,
    usersMiddleware.checkUpdateUser,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    userController.updateUser);
userRouter.get('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([]),
    userController.getAllUsers);
module.exports = userRouter;
