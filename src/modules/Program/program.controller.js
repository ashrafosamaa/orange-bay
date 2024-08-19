import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";
import { allProgramsData } from "./program.response.model.js";
import { programData } from "./program.response.model.js";

import Program from "./program.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addProgram = async (req, res, next)=> {
    const { name, duration , description , city, ticketPriceAdult, ticketPriceChild, title, price } = req.body
    if(title && !price) return next(new Error('Price of activity is required', { cause: 400 }))
    if(!title && price) return next(new Error('Title of activity is required', { cause: 400 }))
    let additionalActivity
        if(title && price) {
        additionalActivity = { title, price }
    }
    // images
    let images = []
    const folderId = generateUniqueString(4)
    if(!req.files.images?.length) {
        return next (new Error("Images are required", { cause: 400 }))
    }
    for (const file of req.files.images) {
        const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(file.path, {
            folder: `${process.env.MAIN_FOLDER}/Programs/${folderId}`
        })
        images.push({ secure_url, public_id })
    }
    const overview = { duration, description, city }
    const program = await Program.create({
        name, overview, ticketPriceAdult, ticketPriceChild, additionalActivity, images, folderId
    })
    if(!program) return next(new Error('Something went wrong, Please try again', { cause: 500 }))
    res.status(201).json({
        msg: "Program created successfully",
        statusCode: 201,
    })
}

export const getAllPrograms = async (req, res, next)=> {
    const {page, size} = req.query
    const features = new APIFeatures(req.query, Program.find()
        .select("name ticketPriceAdult ticketPriceChild images.secure_url"))
        .pagination({page, size})
    const programs = await features.mongooseQuery
    if(!programs.length) {
        return next(new Error('No programs found', { cause: 404 }))
    }
    res.status(200).json({
        msg: "Programs fetched successfully",
        statusCode: 200,
        programs: programs.map(program => allProgramsData(program))
    })
}

export const getProgramById = async (req, res, next)=> {
    const program = await Program.findById(req.params.programId)
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    res.status(200).json({
        msg: "Program fetched successfully",
        statusCode: 200,
        program: programData(program)
    })
}

export const updateProgram = async (req, res, next)=> {
    const { name, duration , description , city, ticketPriceAdult, ticketPriceChild, title, price } = req.body
    const program = await Program.findById(req.params.programId).select("-createdAt -updatedAt -__v -folderId -images.public_id")
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    if(name) program.name = name
    if(duration) program.overview.duration = duration
    if(description) program.overview.description = description
    if(city) program.overview.city = city
    if(ticketPriceAdult) program.ticketPriceAdult = ticketPriceAdult
    if(ticketPriceChild) program.ticketPriceChild = ticketPriceChild
    if(title) program.additionalActivity.title = title
    if(price) program.additionalActivity.price = price
    await program.save()
    res.status(200).json({
        msg: "Program updated successfully",
        statusCode: 200,
        program: programData(program)
    })
}

export const deleteProgram = async (req, res, next)=> {
    const program = await Program.findByIdAndDelete(req.params.programId)
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    // delete photo
    const folder = `${process.env.MAIN_FOLDER}/Programs/${program.folderId}`
    await cloudinaryConnection().api.delete_resources_by_prefix(folder)
    await cloudinaryConnection().api.delete_folder(folder)
    res.status(200).json({
        msg: "Program deleted successfully",
        statusCode: 200,
    })
}

export const addSchedule = async (req, res, next)=> {
    const program = await Program.findById(req.params.programId)
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    program.schedule = req.body.schedule
    await program.save()
    res.status(201).json({
        msg: "Schedule added successfully",
        statusCode: 201
    })
}

export const deleteAllSchedule = async (req, res, next)=> {
    const program = await Program.findById(req.params.programId)
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    program.schedule = []
    await program.save()
    res.status(200).json({
        msg: "Schedules deleted successfully",
        statusCode: 200
    })
}