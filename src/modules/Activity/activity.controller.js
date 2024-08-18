import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";

import Activity from "./activity.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addActivity = async (req, res, next)=> {
    // destruct data from req.body
    const {title, description, price} = req.body
    // check name
    const isNameExist = await Activity.findOne({ title })
    if(isNameExist) return next(new Error('This title is already exist, Please try another title', { cause: 409 }))
    // upload image
    let coverImage
    const folderId = generateUniqueString(4)
    if(!req.file){
        return next (new Error("Image is required", { cause: 400 }))
    }
    const {secure_url, public_id} = await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `${process.env.MAIN_FOLDER}/Activities/${folderId}`
    })
    coverImage = {
        secure_url,
        public_id
    }
    // create new activity
    const activityCreated = await Activity.create({ title, description, price, coverImage, folderId })
    if (!activityCreated) {
        return next(new Error('Error while adding Activity', { cause: 500 }))
    }
    // send response
    res.status(201).json({
        msg: "Activity created successfully",
        statusCode: 201
    })
}

export const getAllActivities = async (req, res, next)=> {
    const {page, size} = req.query
    const features = new APIFeatures(req.query, Activity.find()
    .select("title price coverImage.secure_url"))
        .pagination({page, size})
    const activities = await features.mongooseQuery
    if(!activities.length) {
        return next(new Error('No activities found', { cause: 404 }))
    }
    res.status(200).json({
        msg: "Activities fetched successfully",
        statusCode: 200,
        activities
    })
}

export const getActivityById = async (req, res, next)=> {
    // destruct data from req.params
    const {activityId} = req.params
    const activity = await Activity.findById(activityId).select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if(!activity) {
        return next(new Error('No activity found', { cause: 404 }))
    }
    res.status(200).json({ 
        msg: "Activity fetched successfully", 
        statusCode: 200,
        activity 
    })
}

export const updateActivity = async (req, res, next)=> {
    const { activityId } = req.params
    const { title, description, price } = req.body
    // check name
    const isNameExist = await Activity.findOne({ title, _id: {$ne: activityId} })
    if(isNameExist) return next(new Error('This title is already exist, Please try another one', { cause: 409 }))
    // update Activity
    const activityUpdated = await Activity.findByIdAndUpdate(activityId, { title, description, price }, {new: true})
        .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if (!activityUpdated) {
        return next(new Error('Error while updating Activity', { cause: 500 }))
    }
    // send response
    res.status(200).json({
        msg: "Activity updated successfully",
        statusCode: 200,
        activityUpdated
    })
}

export const deleteActivity = async (req, res, next)=> {
    const {activityId} = req.params
    // delete Activity
    const activityDeleted = await Activity.findByIdAndDelete(activityId)
    if (!activityDeleted) {
        return next(new Error('Error while deleting Activity', { cause: 500 }))
    }
    // delete photo
    const folder = `${process.env.MAIN_FOLDER}/Activities/${activityDeleted.folderId}`
    await cloudinaryConnection().api.delete_resources_by_prefix(folder)
    await cloudinaryConnection().api.delete_folder(folder)
    // send response
    res.status(200).json({
        msg: "Activity deleted successfully",
        statusCode: 200
    })
}