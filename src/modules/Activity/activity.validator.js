import Joi from "joi";

export const addActivityValidator = {
    body: Joi.object({
        title: Joi.string().required().min(3),
        description: Joi.string().required().min(10),
        price: Joi.number().required().min(1)
    })
}


export const getAllActivitiesValidator = {
    query: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
    })
}


export const IDValidator = {
    params: Joi.object({
        activityId: Joi.string().length(24).hex().required()
    })
}


export const updateActivityValidator = {
    params: Joi.object({
        activityId: Joi.string().length(24).hex().required()
    }),
    body: Joi.object({
        title: Joi.string().optional().min(3),
        description: Joi.string().optional().min(10),
        price: Joi.number().optional().min(1)
    })
}