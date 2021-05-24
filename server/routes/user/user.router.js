const { Router } = require('express');

const { userController } = require('../../controllers');
const { usersMiddleware, fileMiddleware, authMiddleware } = require('../../middlewares');
const { ADMIN, MANAGER } = require('../../constants/constants');

const userRouter = Router();

userRouter.use(authMiddleware.checkAccessToken);

userRouter.post('/',
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
    usersMiddleware.checkUserAccess([]),
    userController.getAllUsers);
userRouter.get('/:id',
    usersMiddleware.checkUserAccess([]),
    userController.getOneUser);
module.exports = userRouter;
