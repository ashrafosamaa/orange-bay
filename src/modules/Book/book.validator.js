import Joi from "joi";

export const addBookValidator = {
    body: Joi.object({
        programId: Joi.string().length(24).hex().required(), 
        activityId: Joi.string().length(24).hex().optional(),
        adultNo: Joi.number().required(), 
        childNo: Joi.number().optional(), 
        date: Joi.date().greater(Date.now()-(24*60*60*1000)).required(), 
        time: Joi.string().required(), 
        paymentMethod: Joi.string().required().valid("cash", "card"),
    }),
}


export const getAllBooksValidator = {
    query: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
        status: Joi.string().optional().valid("upcomming", "past", "cancelled"),
    })
}


export const cancelBookValidator = {
    params: Joi.object({
        bookId: Joi.string().length(24).hex().required()
    }),
}