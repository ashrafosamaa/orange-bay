import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js"

import * as photoController from './photo.controller.js'
import * as validator from "./photo.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/', authUser('ADMIN'),
    multerMiddleHost({extensions: allowedExtensions.image}).single('image'),
    validationMiddleware(validator.addPhotoValidator),
    expressAsyncHandler(photoController.addPhoto))

router.get('/', validationMiddleware(validator.getAllPhotosValidator),
    expressAsyncHandler(photoController.getAllPhotos))

router.delete('/:photoId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(photoController.deletePhoto))

export default router