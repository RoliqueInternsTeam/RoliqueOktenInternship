const { Router } = require('express');

const { userController } = require('../../controllers');
const { usersMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');

const userRouter = Router();

userRouter.post('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserValid,
    fileMiddleware.checkFileMiddleware,
    usersMiddleware.checkIsUserCreated,
    fileMiddleware.checkPhotoCountUser,
    userController.createUser);
userRouter.put('/:id',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserById,
    usersMiddleware.checkUpdateUser,
    fileMiddleware.checkFileMiddleware,
    fileMiddleware.checkPhotoCountUser,
    userController.updateUser);
userRouter.get('/',
    authMiddleware.checkAccessToken,
    usersMiddleware.checkUserAccess([]),
    userController.getAllUsers);

module.exports = userRouter;
