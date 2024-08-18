import Joi from "joi";

export const addToWishListValidator = {
    params: Joi.object({
        programId: Joi.string().required().length(24).hex()
    })
}


export const allProgramsInWishListValidator = {
    query:Joi.object({
        page: Joi.number().integer().min(1).optional(),
        size: Joi.number().integer().min(1).optional(),
    })
}


export const deleteProgramFromWishListValidator = {
    params: Joi.object({
        programId: Joi.string().hex().length(24).required(),
    }),
}