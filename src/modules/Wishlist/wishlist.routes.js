import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

import * as wishlistController from "./wishlist.controller.js"
import * as validator from "./wishlist.validator.js"

import expressAsyncHandler from "express-async-handler";


const router = Router();

router.post('/:programId', authUser('USER'), validationMiddleware(validator.addToWishListValidator),
    expressAsyncHandler(wishlistController.addToWishList))

router.get('/', authUser('USER'), validationMiddleware(validator.allProgramsInWishListValidator), 
    expressAsyncHandler(wishlistController.allProgramsInWishList))

router.delete('/:programId', authUser('USER'), validationMiddleware(validator.deleteProgramFromWishListValidator),
    expressAsyncHandler(wishlistController.deleteProgramFromWishList))


export default router;