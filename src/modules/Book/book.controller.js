import { APIFeatures } from "../../utils/api-features.js";
import { bookingProgram } from "../Program/program.response.model.js";

import Book from "./book.model.js";
import Program from "../Program/program.model.js";
import Activity from "../Activity/activity.model.js";

export const addBook = async (req, res, next) => {
    // destruct data from req.body
    const { programId, adultNo, childNo, date, time, paymentMethod, activityId } = req.body;
    // check if user exists
    const user = await Book.findOne({userId: req.authUser._id, paymentstatus: "unpaid"});
    if (user) {
        return next(new Error("You already have an unpaid booking", { cause: 400 }));
    }
    const isProgram = await Program.findById(programId);
    if (!isProgram) {
        return next(new Error("Program not found", { cause: 404 }));
    }
    let activities
    if(activityId){
        // check activities avaliability
        activities = await Activity.findById(activityId);
        if (!activities) {
            return next(new Error("Activity not found", { cause: 404 }));
        }
    }
    const dateFormate = new Date(date);
    // cancellation deadline
    const cancellationDeadline = new Date(dateFormate.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    // calculate total price
    let totalPrice = 
    (adultNo * (isProgram.ticketPriceAdult ?? 0)) + 
    (childNo * (isProgram.ticketPriceChild ?? 0)) + 
    (activities?.price ?? 0) * adultNo;
    // create new book 
    const newBook = await Book.create({
        userId: req.authUser._id,
        programId,
        activityId,
        adultNo,
        childNo,
        date: dateFormate,
        time,
        paymentMethod,
        cancellationDeadline,
        totalPrice,
    })
    if(!newBook) {
        return next(new Error("Book not created", { cause: 400 }));
    }
    // send response
    res.status(201).json({
        msg: "Booked successfully",
        statusCode: 201,
    })
}

export const getAllBooks = async (req, res, next) => {
    const {page, size, status} = req.query;
    // get all books
    const features = new APIFeatures(req.query, Book.find({userId: req.authUser._id, status: status || "upcomming"})
        .populate({path: "programId", select:"name images.secure_url"})
        .populate({path: "activityId", select:"title"})
        .select('date time adultNo childNo paymentstatus totalPrice cancellationDeadline'))
        .pagination({ page, size })
    const books = await features.mongooseQuery
    if(!books.length) {
        return next(new Error("No books found", { cause: 404 }))
    }
    // send response
    res.status(200).json({
        msg: "Books fetched successfully",
        statusCode: 200,
        books: books.map(book => bookingProgram(book))
    })
}

export const cancelBook = async (req, res, next) => {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
        return next(new Error("Book not found", { cause: 404 }));
    }
    if (book.userId.toString() !== req.authUser._id.toString()) {
        return next(new Error("Unauthorized", { cause: 401 }));
    }
    const cancellationDeadline = new Date(book.cancellationDeadline);
    if(cancellationDeadline <= new Date()) {
        return next(new Error("Cancellation deadline exceeded", { cause: 400 }));
    }
    book.status = "cancelled";
    await book.save();
    res.status(200).json({
        msg: "Book cancelled successfully",
        statusCode: 200
    })
}