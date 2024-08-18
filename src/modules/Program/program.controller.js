import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";

import Program from "./program.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addProgram = async (req, res, next)=> {
    const { name, duration , description , city, schedule, ticketPriceAdult, ticketPriceChild } = req.body
    // images 
    let images = []
    const folderId = generateUniqueString(4)
    if(req.files) {
        for (const file of req.files.images) {
            const { secure_url, public_id } = await cloudinaryConnection().uploader.upload(file.path, {
                folder: `${process.env.MAIN_FOLDER}/Programs/${folderId}`
            })
            images.push({ secure_url, public_id })
        }
    }
    const overview = { duration, description, city }
    const program = await Program.create({
        name, overview, schedule, ticketPriceAdult, ticketPriceChild, images, folderId
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
    const modifiedPrograms = programs.map(program => {
        if (program.images && program.images.length > 0) {
            program.images = [program.images[0]];
        }
        return program;
    });
    res.status(200).json({
        msg: "Programs fetched successfully",
        statusCode: 200,
        modifiedPrograms
    })
}

export const getProgramById = async (req, res, next)=> {
    const program = await Program.findById(req.params.programId).select("-createdAt -updatedAt -__v -folderId -images.public_id")
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    res.status(200).json({
        msg: "Program fetched successfully",
        statusCode: 200,
        program
    })
}

export const updateProgram = async (req, res, next)=> {
    const { name, duration , description , city, ticketPriceAdult, ticketPriceChild } = req.body
    const program = await Program.findById(req.params.programId).select("-createdAt -updatedAt -__v -folderId -images.public_id")
    if(!program) return next(new Error('Program not found', { cause: 404 }))
    if(name) program.name = name
    if(duration) program.overview.duration = duration
    if(description) program.overview.description = description
    if(city) program.overview.city = city
    if(ticketPriceAdult) program.ticketPriceAdult = ticketPriceAdult
    if(ticketPriceChild) program.ticketPriceChild = ticketPriceChild
    await program.save()
    res.status(200).json({
        msg: "Program updated successfully",
        statusCode: 200,
        program
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