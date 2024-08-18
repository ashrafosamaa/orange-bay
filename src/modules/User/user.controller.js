import { APIFeatures } from "../../utils/api-features.js";

import User from "../User-Auth/user.model.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const getAllUsers = async (req, res, next) => {
    // destruct data from req.query
    const {page, size, sortBy} = req.query;
    const features = new APIFeatures(req.query, User.find({role: "USER"}).select("firstName lastName phoneNumber email"))
        .pagination({ page, size })
        .sort(sortBy)
    const users = await features.mongooseQuery
    if(!users.length) {
        return next(new Error("No users found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "Users data fetched successfully", 
        statusCode: 200,
        users
    })
}

export const getUser = async(req, res, next)=> {
    // destruct data from user
    const {userId} = req.params
    // get user data
    const getUser = await User.findById(userId).select("firstName lastName phoneNumber email")
    if (!getUser) {
        return next(new Error("User not found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "User data fetched successfully",
        statusCode: 200,
        getUser
    })
}

export const search = async (req, res, next) => {
    // destruct data from user
    const { page, size, ...serach } = req.query;
    // get users data
    const features = new APIFeatures(req.query, User.find({role: "USER"}).select("firstName lastName phoneNumber email"))
        .pagination({ page, size })
        .searchUsers(serach)
        .sort()
    const users = await features.mongooseQuery
    if (!users.length) {
        return next(new Error("No users found matching with your search query", { cause: 404 }))
    }
    res.status(200).json({
        msg: "Users data fetched successfully",
        statusCode: 200,
        users
    });
}

export const updateUser = async(req, res, next)=> {
    // destruct data from user
    const {userId} = req.params
    const {firstName, lastName, phoneNumber} = req.body
    // find user
    const user = await User.findById(userId).select("firstName lastName phoneNumber email")
    // check user
    if(!user){
        return next (new Error("User not found", { cause: 404 }))
    }
    // new phone check
    if(phoneNumber){
        const isPhoneExist = await User.findOne({phoneNumber, _id: {$ne: userId} })
        if(isPhoneExist){
            return next (new Error("Phone number is already exists, Please try another phone number", { cause: 409 }))
        }
        user.phoneNumber = phoneNumber
    }
    // update user data
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    await user.save()
    // send response
    res.status(200).json({
        msg: "User updated successfully",
        statusCode: 200,
        user
    })
}

export const deleteUser = async(req, res, next)=> {
    // destruct data from user
    const {userId} = req.params
    // delete user data
    const deleteUser = await User.findByIdAndDelete(userId)
    if (!deleteUser) {
        return next (new Error("User not found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "User deleted successfully",
        statusCode: 200
    })
}

export const getAccountData = async (req, res, next)=> {
    // destruct data from user
    const {_id} = req.authUser
    // get user data
    const getUser = await User.findById(_id).select("firstName lastName phoneNumber email")
    if (!getUser) {
        return next (new Error("User not found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "User data fetched successfully",
        statusCode: 200,
        getUser
    })
}

export const updateProfileData = async (req, res, next)=> {
    // destruct data from user
    const {_id} = req.authUser
    const{firstName, lastName, phoneNumber} = req.body
    // find user
    const user = await User.findById(_id).select("firstName lastName phoneNumber email")
    // check user
    if(!user){
        return next (new Error("User not found", { cause: 404 }))
    }
    // new phone check
    if(phoneNumber){
        const isPhoneExist = await User.findOne({phoneNumber, _id: {$ne: _id} })
        if(isPhoneExist){
            return next (new Error("Phone number is already exists, Please try another phone number", { cause: 409 }))
        }
        user.phoneNumber = phoneNumber
    }
    // update user data
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    await user.save()
    // send response
    res.status(200).json({
        msg: "User data updated successfully",
        statusCode: 200,
        user
    })
}

export const updatePassword = async (req, res, next)=> {
    // destruct data from user
    const {_id} = req.authUser
    const {password, oldPassword} = req.body
    // find user
    const user = await User.findById(_id)
    // check old password
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
    if(!isPasswordMatch){
        return next (new Error("Invalid old password", { cause: 400 }))
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT_ROUNDS)
    // update user data
    user.password = hashedPassword
    user.passwordChangedAt = Date.now()
    await user.save()
    // generate token
    const userToken = jwt.sign({ id: user._id ,email: user.email , userName: user.firstName, role: user.role},
        process.env.JWT_SECRET_LOGIN,
        {
            expiresIn: "90d"
        }
    )
    // send response
    res.status(200).json({
        msg: "User password updated successfully",
        statusCode: 200,
        userToken
    })
}

export const deleteAccount = async (req, res, next)=> {
    // destruct data from user
    const {_id} = req.authUser
    // delete user data
    const deleteUser = await User.findByIdAndDelete(_id)
    if (!deleteUser) {
        return next (new Error("User not found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "User deleted successfully",
        statusCode: 200
    })
}