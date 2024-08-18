import Joi from "joi";

export const addProgramValidator = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(100),
        duration: Joi.string().required(),
        city: Joi.string().required(),
        description: Joi.string().required().min(50).max(400),
        ticketPriceAdult: Joi.number().required(),
        ticketPriceChild: Joi.number().required(),
    })
}


export const getAllProgramsValidator = {
    query: Joi.object({
        page: Joi.number().optional(),
        size: Joi.number().optional(),
    })
}


export const IDValidator = {
    params: Joi.object({
        programId: Joi.string().length(24).hex().required()
    })
}


export const updateProgramValidator = {
    body: Joi.object({
        name: Joi.string().optional().min(3).max(100),
        duration: Joi.string().optional(),
        city: Joi.string().optional(),
        description: Joi.string().optional().min(50).max(400),
        ticketPriceAdult: Joi.number().optional(),
        ticketPriceChild: Joi.number().optional(),
    }),
    params: Joi.object({
        programId: Joi.string().length(24).hex().required()
    })
}


export const addScheduleValidator = {
    body: Joi.object({
        schedule: Joi.array().items(
            Joi.object({
                time: Joi.string().required(),
                activity: Joi.string().required(),
            })
        ),
    }),
    params: Joi.object({
        programId: Joi.string().length(24).hex().required()
    })
}