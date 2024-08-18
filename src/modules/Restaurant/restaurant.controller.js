import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";

import Restaurant from "./restaurant.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addRestaurant = async (req, res, next)=> {
    // destruct data from user
    const { title, description, category, startAt, endAt, price, locationLink } = req.body
    // check name
    const isNameExist = await Restaurant.findOne({ title })
    if(isNameExist) return next(new Error('This title is already exist, Please try another one', { cause: 409 }))
    // upload image
    let coverImage
    const folderId = generateUniqueString(4)
    if(!req.file){
        return next (new Error("Image is required", { cause: 400 }))
    }
    const {secure_url, public_id} = await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `${process.env.MAIN_FOLDER}/Restaurants/${folderId}`
    })
    coverImage = {
        secure_url,
        public_id
    }
    // Restaurant
    const restaurant = {
        title, description, coverImage, category, startAt, endAt, price, locationLink, folderId }
    const newRestaurant = await Restaurant.create(restaurant)
    if(!newRestaurant) return next(new Error('Something went wrong, Please try again', { cause: 500 }))
    // send response
    res.status(201).json({
        msg: 'Restaurant created successfully',
        statusCode: 201,
    })
}

export const getAllRestaurants = async (req, res, next) => {
    const {page, size} = req.query
    const features = new APIFeatures(req.query, Restaurant.find()
    .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id"))
        .pagination({page, size})
    const restaurant = await features.mongooseQuery
    if(!restaurant.length) {
        return next(new Error('No restaurants found', { cause: 404 }))
    }
    res.status(200).json({
        msg: "Restaurants fetched successfully",
        statusCode: 200,
        restaurant
    })
}

export const getRestaurantById = async (req, res, next)=> {
    const restaurant = await Restaurant.findById(req.params.restaurantId)
        .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if(!restaurant){
        return next(new Error("Restaurant not found", { cause: 404 }))
    }
    res.status(200).json({
        msg: "Restaurant fetched successfully",
        statusCode: 200,
        restaurant
    })
}

export const updateRestaurant = async (req, res, next)=> {
    // destruct data from artist
    const {restaurantId} = req.params
    const { title, description, category, startAt, endAt, price, locationLink } = req.body
    // check name
    const isNameExist = await Restaurant.findOne({ title, _id: {$ne: restaurantId} })
    if(isNameExist) return next(new Error('This title is already exist, Please try another one', { cause: 409 }))
    // update Restaurant
    const restaurantUpdated = await Restaurant.findByIdAndUpdate(restaurantId,
        { title, description, category, startAt, endAt, price, locationLink }, {new: true})
        .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if (!restaurantUpdated) {
        return next(new Error('Error while updating Restaurant', { cause: 500 }))
    }
    res.status(200).json({
        msg: "Restaurant updated successfully",
        statusCode: 200,
        restaurantUpdated
    })
}

export const deleteRestaurant = async (req, res, next)=> {
    const { restaurantId } = req.params
    // delete Restaurant
    const restaurantDeleted = await Restaurant.findByIdAndDelete(restaurantId)
    if (!restaurantDeleted) {
        return next(new Error('Error while deleting Restaurant', { cause: 500 }))
    }
    // delete photo
    const folder = `${process.env.MAIN_FOLDER}/Restaurants/${restaurantDeleted.folderId}`
    await cloudinaryConnection().api.delete_resources_by_prefix(folder)
    await cloudinaryConnection().api.delete_folder(folder)
    // send response
    res.status(200).json({
        msg: "Restaurant deleted successfully",
        statusCode: 200
    })
}