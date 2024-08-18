import { Schema, model } from "mongoose";

const bookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    programId: {
        type: Schema.Types.ObjectId,
        ref: "Program",
        required: true
    },
    activityId: {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
    },

    adultNo: {
        type: Number,
        required: true
    },
    childNo: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    cancellationDeadline: {
        type: String,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["cash"],
        
    },
    paymentstatus: {
        type: String,
        enum: ["unpaid", "paid"],
        default: "unpaid"
    },
    status: {
        type: String,
        enum: ["upcomming", "past", "cancelled"],
        default: "upcomming"
    }

}, {timestamps: true,
})


const Book = model("Book", bookSchema);

export default Book;