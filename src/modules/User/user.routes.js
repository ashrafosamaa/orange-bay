import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

import * as userController from './user.controller.js'
import * as validator from "./user.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();


router.get('/', authUser('ADMIN'), validationMiddleware(validator.getAllUsersValidator),
    expressAsyncHandler(userController.getAllUsers))

router.get('/account/:userId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(userController.getUser))

router.get('/search', authUser('ADMIN'), validationMiddleware(validator.searchValidator),
    expressAsyncHandler(userController.search))

router.put('/update/:userId', authUser('ADMIN'), validationMiddleware(validator.updateUserValidator),
    expressAsyncHandler(userController.updateUser))

router.delete('/delete/:userId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(userController.deleteUser))

router.get('/profiledata', authUser('USER'), validationMiddleware(validator.noValidator),
    expressAsyncHandler(userController.getAccountData))

router.put('/updateprofile', authUser('USER'), validationMiddleware(validator.updateByUserValidator),
    expressAsyncHandler(userController.updateProfileData))

router.patch('/updatepassword', authUser('USER'), validationMiddleware(validator.updatePasswordValidator),
    expressAsyncHandler(userController.updatePassword))

router.delete('/deleteaccount', authUser('USER'), validationMiddleware(validator.noValidator),
    expressAsyncHandler(userController.deleteAccount))


export default router;