import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { allowedExtensions } from "../../utils/allowed-extensions.js";
import { multerMiddleHost } from "../../middlewares/multer.middleware.js"

import * as restaurantController from './restaurant.controller.js'
import * as validator from "./restaurant.validator.js"

import expressAsyncHandler from "express-async-handler";

const router = Router();

router.post('/', authUser('ADMIN'),
    multerMiddleHost({ extensions: allowedExtensions.image }).single('coverImg'),
    validationMiddleware(validator.addRestaurantValidator),
    expressAsyncHandler(restaurantController.addRestaurant))

router.get('/', validationMiddleware(validator.getAllRestaurantsValidator),
    expressAsyncHandler(restaurantController.getAllRestaurants))

router.get('/single/:restaurantId', validationMiddleware(validator.IDValidator),
    expressAsyncHandler(restaurantController.getRestaurantById))

router.put('/:restaurantId', authUser('ADMIN'), validationMiddleware(validator.updateRestaurantValidator),
    expressAsyncHandler(restaurantController.updateRestaurant))

router.delete('/:restaurantId', authUser('ADMIN'), validationMiddleware(validator.IDValidator),
    expressAsyncHandler(restaurantController.deleteRestaurant))


export default router