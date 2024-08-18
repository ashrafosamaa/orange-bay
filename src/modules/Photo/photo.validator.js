import Joi from "joi";

export const addPhotoValidator = {
    body: Joi.object({
        type: Joi.string().required().valid('panoramic', 'relax'),
    })
}


export const getAllPhotosValidator = {
    query: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
        type: Joi.string().optional().valid('panoramic', 'relax'),
    })
}


export const IDValidator = {
    params: Joi.object({
        photoId: Joi.string().length(24).hex().required()
    })
}