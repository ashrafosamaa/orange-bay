import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

import * as wishlistController from "./wishlist.controller.js"
import * as validator from "./wishlist.validator.js"

import expressAsyncHandler from "express-async-handler";


const router = Router();

router.post('/:programId', authUser('ADMIN'), validationMiddleware(validator.addToWishListValidator),
    expressAsyncHandler(wishlistController.addToWishList))

router.get('/', authUser('ADMIN'), validationMiddleware(validator.allProgramsInWishListValidator), 
    expressAsyncHandler(wishlistController.allProgramsInWishList))

router.delete('/:programId', authUser('ADMIN'), validationMiddleware(validator.deleteProgramFromWishListValidator),
    expressAsyncHandler(wishlistController.deleteProgramFromWishList))


export default router;