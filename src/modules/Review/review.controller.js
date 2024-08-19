import { APIFeatures } from "../../utils/api-features.js";
import { reviewsProgram } from "../Program/program.response.model.js";

import Review from "./review.model.js";
import Program from "../Program/program.model.js";
import Book from "../Book/book.model.js";

export const addReview = async (req, res, next) => {
    // destruct data from the user
    const { rating, comment } = req.body;
    // check that program is found
    const isProgramAvailableToReview = await Book.findOne({
        userId: req.authUser._id,
        programId: req.params.programId,
        status: "past",
    });
    if (!isProgramAvailableToReview) {
        return next(new Error("You can't add review for this program", { cause: 404 }));
    } 
    // review object
    const reviewObj = {
        rating,
        comment,
        userId: req.authUser._id,
        programId: req.params.programId,
    }
    // create review
    const reviewDb = await Review.create(reviewObj);
    if(!reviewDb){
        return next(new Error("Review not created", { cause: 400 }));
    }
    // update program
    const program = await Program.findById(req.params.programId);
    const reviews = await Review.find({ programId: req.params.programId });
    let ratesSum = 0
    for (const review of reviews) {
        ratesSum += review.rating;
    }
    program.rate = ratesSum / reviews.length;
    await program.save();
    // send response
    res.status(201).json({
        msg: "Review added successfully",
        statusCode: 201,
    });
}

export const allProgramReviews = async (req, res, next) => {
    // destruct data from the user
    const {page, size} = req.query
    // check that order is found
    const features = new APIFeatures(req.query, Program.findById(req.params.programId)
        .populate({path: 'Reviews', select: 'userId rating comment', populate: {path: 'userId', select: 'firstName lastName'}})
        .select('rate name images.secure_url'))
        .pagination({page, size})
    const program = await features.mongooseQuery
    if(!program){
        return next(new Error("Program not found", { cause: 404 }));
    }
    // send response
    res.status(200).json({
        msg: "Reviews fetched successfully",
        statusCode: 200,
        program: reviewsProgram(program)
    });
}

export const deleteReview = async (req, res, next) => {
    // Destructure reviewId from the request parameters
    const { reviewId } = req.params;
    // Check that the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new Error("Review not found", { cause: 404 }));
    }
    // Get the related program and its reviews
    const programId = review.programId;
    const program = await Program.findById(programId);
    const reviews = await Review.find({ programId });
    // Calculate the sum of all ratings excluding the current review
    let sumRating = 0;
    for (const rev of reviews) {
        sumRating += rev.rating;
    }
    // Subtract the current review's rating
    sumRating -= review.rating;
    await review.deleteOne();
    // Update the program's rate
    if (reviews.length > 1) {
        program.rate = sumRating / (reviews.length - 1);
    } else {
        program.rate = 0;
    }
    // Save the updated program
    await program.save();
    // Send response
    res.status(200).json({
        msg: "Review deleted successfully",
        statusCode: 200,
    });
}