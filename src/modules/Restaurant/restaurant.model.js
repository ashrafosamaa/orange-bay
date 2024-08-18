import { Schema, model } from "mongoose";

const restaurantSchema = new Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        required: true
    },

    startAt: {
        type: String,
        required: true
    },
    endAt: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    
    locationLink: {
        type: String,
        required: true
    },
    coverImage: {
        public_id: {type: String, required: true},
        secure_url: {type: String, required: true}
    },
    folderId: {
        type: String,
        required: true,
    },
}, {timestamps: true,
});


const Restaurant = model("Restaurant", restaurantSchema);

export default Restaurant;