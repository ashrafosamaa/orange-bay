import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js"

import * as activityController from './activity.controller.js'
import * as validator from "./activity.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/', authUser('ADMIN'),
    multerMiddleHost({extensions: allowedExtensions.image}).single('coverImg'),
    validationMiddleware(validator.addActivityValidator),
    expressAsyncHandler(activityController.addActivity))

router.get('/', validationMiddleware(validator.getAllActivitiesValidator),
    expressAsyncHandler(activityController.getAllActivities))

router.get('/single/:activityId', validationMiddleware(validator.IDValidator),
    expressAsyncHandler(activityController.getActivityById))

router.put('/:activityId', authUser('ADMIN'), validationMiddleware(validator.updateActivityValidator),
    expressAsyncHandler(activityController.updateActivity))

router.delete('/:activityId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(activityController.deleteActivity))

export default router
