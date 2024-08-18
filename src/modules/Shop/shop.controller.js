import { APIFeatures } from "../../utils/api-features.js";
import { generateUniqueString } from "../../utils/generate-unique-string.js";

import Shop from "./shop.model.js";
import cloudinaryConnection from "../../utils/cloudinary.js";

export const addShop = async (req, res, next)=> {
    // destruct data from user
    const { title, description, category, startAt, endAt, locationLink } = req.body
    // check name
    const isNameExist = await Shop.findOne({ title })
    if(isNameExist) return next(new Error('This title is already exist, Please try another one', { cause: 409 }))
    // upload image
    let coverImage
    const folderId = generateUniqueString(4)
    if(!req.file){
        return next (new Error("Image is required", { cause: 400 }))
    }
    const {secure_url, public_id} = await cloudinaryConnection().uploader.upload(req.file.path, {
        folder: `${process.env.MAIN_FOLDER}/Shops/${folderId}`
    })
    coverImage = {
        secure_url,
        public_id
    }
    // Shop
    const shop = {
        title, description, coverImage, category, startAt, endAt, locationLink, folderId }
    const newShop = await Shop.create(shop)
    if(!newShop) return next(new Error('Something went wrong, Please try again', { cause: 500 }))
    // send response
    res.status(201).json({
        msg: 'Shop created successfully',
        statusCode: 201,
    })
}

export const getAllShops = async (req, res, next) => {
    const {page, size} = req.query
    const features = new APIFeatures(req.query, Shop.find()
    .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id"))
        .pagination({page, size})
    const shop = await features.mongooseQuery
    if(!shop.length) {
        return next(new Error('No shops found', { cause: 404 }))
    }
    res.status(200).json({
        msg: "Shops fetched successfully",
        statusCode: 200,
        shop
    })
}

export const getShopById = async (req, res, next)=> {
    const shop = await Shop.findById(req.params.shopId)
        .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if(!shop){
        return next(new Error("Shop not found", { cause: 404 }))
    }
    res.status(200).json({
        msg: "Shop fetched successfully",
        statusCode: 200,
        shop
    })
}

export const updateShop = async (req, res, next)=> {
    // destruct data from artist
    const {shopId} = req.params
    const { title, description, category, startAt, endAt, price, locationLink } = req.body
    // check name
    const isNameExist = await Shop.findOne({ title, _id: {$ne: shopId} })
    if(isNameExist) return next(new Error('This title is already exist, Please try another one', { cause: 409 }))
    // update Shop
    const shopUpdated = await Shop.findByIdAndUpdate(shopId,
        { title, description, category, startAt, endAt, price, locationLink }, {new: true})
        .select("-createdAt -updatedAt -__v -folderId -coverImage.public_id")
    if (!shopUpdated) {
        return next(new Error('Error while updating Shop', { cause: 500 }))
    }
    res.status(200).json({
        msg: "Shop updated successfully",
        statusCode: 200,
        shopUpdated
    })
}

export const deleteShop = async (req, res, next)=> {
    const { shopId } = req.params
    // delete Shop
    const shopDeleted = await Shop.findByIdAndDelete(shopId)
    if (!shopDeleted) {
        return next(new Error('Error while deleting Shop', { cause: 500 }))
    }
    // delete photo
    const folder = `${process.env.MAIN_FOLDER}/Shops/${shopDeleted.folderId}`
    await cloudinaryConnection().api.delete_resources_by_prefix(folder)
    await cloudinaryConnection().api.delete_folder(folder)
    // send response
    res.status(200).json({
        msg: "Shop deleted successfully",
        statusCode: 200
    })
}