import { Schema, model } from "mongoose";

const activitySchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 1
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
})

const Activity = model("Activity", activitySchema);

export default Activity;