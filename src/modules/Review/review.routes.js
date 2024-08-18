import { Router } from "express";
import { authUser } from "../../middlewares/auth-user.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";

import * as reviewController from "./review.controller.js"
import * as validator from "./review.validator.js"

import expressAsyncHandler from "express-async-handler";


const router = Router();

router.post('/:programId', authUser('USER'), validationMiddleware(validator.addReviewValidator),
    expressAsyncHandler(reviewController.addReview))

router.get('/:programId', validationMiddleware(validator.allProgramReviewsValidator), 
    expressAsyncHandler(reviewController.allProgramReviews))

router.delete('/:reviewId', authUser('USER'), validationMiddleware(validator.deleteReviewValidator),
    expressAsyncHandler(reviewController.deleteReview))


export default router;