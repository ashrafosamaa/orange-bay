import Joi from "joi";

export const addRestaurantValidator = {
    body: Joi.object({
        title: Joi.string().required().min(3).max(100),
        description: Joi.string().required().min(50).max(400),
        price: Joi.number().required().min(1),
        category: Joi.string().required(), 
        startAt: Joi.string().required(),
        endAt: Joi.string().required(),
        locationLink: Joi.string().required(),
    })
}


export const getAllRestaurantsValidator = {
    query: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
    })
}


export const IDValidator = {
    params: Joi.object({
        restaurantId: Joi.string().length(24).hex().required()
    })
}


export const updateRestaurantValidator = {
    body: Joi.object({
        title: Joi.string().optional().min(3).max(100),
        description: Joi.string().optional().min(50).max(400),
        price: Joi.number().optional().min(1),
        category: Joi.string().optional(), 
        startAt: Joi.string().optional(),
        endAt: Joi.string().optional(),
        locationLink: Joi.string().optional(),
    }),
    params: Joi.object({
        restaurantId: Joi.string().length(24).hex().required()
    })
}