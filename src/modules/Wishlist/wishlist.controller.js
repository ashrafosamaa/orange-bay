import { APIFeatures } from "../../utils/api-features.js";
import { wishlistPorgrams } from "../Program/program.response.model.js";

import WishList from "./wishlist.model.js";
import Program from "../Program/program.model.js";

export const addToWishList = async (req, res, next) => {
    // check that program is found
    const isProgram = await Program.findById(req.params.programId);
    if (!isProgram) {
        return next(new Error("Program not found", { cause: 404 }));
    }
    // create wishlist
    const newWishList = await WishList.create({
        userId: req.authUser._id,
        programId: req.params.programId,
    });
    if(!newWishList){
        return next(new Error("Program not addded to wishlist", { cause: 400 }));
    }
    // send response
    res.status(201).json({
        msg: "program added to your wishlist",
        statusCode: 201,
    });
}

export const allProgramsInWishList = async (req, res, next) => {
    // destruct data from the user
    const {page, size} = req.query
    // check that order is found
    const features = new APIFeatures(req.query, WishList.find({userId: req.authUser._id})
        .populate({path: 'programId', select: 'name images.secure_url rate ticketPriceAdult ticketPriceChild'})
        .select('-__v -updatedAt'))
        .pagination({page, size})
    const programs = await features.mongooseQuery
    if(!programs.length){
        return next(new Error("Program not found", { cause: 404 }));
    }
    // send response
    res.status(200).json({
        msg: "Reviews fetched successfully",
        statusCode: 200,
        programs: programs.map(program => wishlistPorgrams(program))
    });
}

export const deleteProgramFromWishList = async (req, res, next) => {
    // check that program is found
    const isProgram = await Program.findById(req.params.programId);
    if (!isProgram) {
        return next(new Error("Program not found", { cause: 404 }));
    }
    // delete wishlist
    const deleteWishList = await WishList.findOneAndDelete({
        userId: req.authUser._id,
        programId: req.params.programId,
    });
    if(!deleteWishList){
        return next(new Error("Error while deleting program from wishlist", { cause: 400 }));
    }
    // send response
    res.status(200).json({
        msg: "program deleted from your wishlist",
        statusCode: 200,
    });
}