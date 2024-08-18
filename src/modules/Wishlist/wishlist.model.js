import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
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
}, {
    timestamps: true
})


const WishList = model('WishList', wishlistSchema);

export default WishList