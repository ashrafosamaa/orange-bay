import Joi from "joi";

export const addReviewValidator = {
    body: Joi.object({
        rating: Joi.number().integer().min(1).max(5).required(),
        comment: Joi.string().optional()
    }),
    params: Joi.object({
        programId: Joi.string().required().length(24).hex()
    })
}


export const allProgramReviewsValidator = {
    query:Joi.object({
        page: Joi.number().integer().min(1).optional(),
        size: Joi.number().integer().min(1).optional(),
    })
}


export const deleteReviewValidator = {
    params: Joi.object({
        reviewId: Joi.string().hex().length(24).required(),
    }),
}