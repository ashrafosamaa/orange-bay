import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js"

import * as shopController from './shop.controller.js'
import * as validator from "./shop.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/', authUser('ADMIN'),
    multerMiddleHost({ extensions: allowedExtensions.image }).single('coverImg'),
    validationMiddleware(validator.addShopValidator),
    expressAsyncHandler(shopController.addShop))

router.get('/', validationMiddleware(validator.getAllShopsValidator),
    expressAsyncHandler(shopController.getAllShops))

router.get('/single/:shopId', validationMiddleware(validator.IDValidator),
    expressAsyncHandler(shopController.getShopById))

router.put('/:shopId', authUser('ADMIN'), validationMiddleware(validator.updateShopValidator),
    expressAsyncHandler(shopController.updateShop))

router.delete('/:shopId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(shopController.deleteShop))


export default router