import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";

import Photo from "./photo.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addPhoto = async (req, res, next)=> {
    // destruct data from req.body
    const { type } = req.body
    // upload image
    let image
    const folderId = generateUniqueString(4)
    if(!req.file){
        return next (new Error("Image is required", { cause: 400 }))
    }
    const {secure_url, public_id} = await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `${process.env.MAIN_FOLDER}/Photos/${folderId}`
    })
    image = {
        secure_url,
        public_id
    }
    // create new photo
    const photoAdded = await Photo.create({ image, folderId, type })
    if (!photoAdded) {
        return next(new Error('Error while adding Photo', { cause: 500 }))
    }
    // send response
    res.status(201).json({
        msg: "Photo added successfully",
        statusCode: 201
    })
}

export const getAllPhotos = async (req, res, next)=> {
    const {page, size, type} = req.query
    const features = new APIFeatures(req.query, Photo.find({type: type || { $in: ['panoramic', 'relax'] }})
        .select("type image.secure_url"))
        .pagination({page, size})
    const photos = await features.mongooseQuery
    if(!photos.length) {
        return next(new Error('No photos found', { cause: 404 }))
    }
    res.status(200).json({
        msg: "Photos fetched successfully",
        statusCode: 200,
        photos
    })
}

export const deletePhoto = async (req, res, next)=> {
    const {photoId} = req.params
    // delete Photo
    const photoDeleted = await Photo.findByIdAndDelete(photoId)
    if (!photoDeleted) {
        return next(new Error('Error while deleting Photo', { cause: 500 }))
    }
    // delete photo
    const folder = `${process.env.MAIN_FOLDER}/Photos/${photoDeleted.folderId}`
    await cloudinaryConnection().api.delete_resources_by_prefix(folder)
    await cloudinaryConnection().api.delete_folder(folder)
    // send response
    res.status(200).json({
        msg: "Photo deleted successfully",
        statusCode: 200
    })
}