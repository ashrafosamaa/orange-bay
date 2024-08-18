import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    programId: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        enum: [1, 2, 3, 4, 5]
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const Review = model('Review', reviewSchema);

export default Review