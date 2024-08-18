import { Schema, model } from "mongoose";

const photoSchema = new Schema({
    image: {
        secure_url: {type: String, required: true},
        public_id: {type: String, required: true},
    },
    folderId: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true,
        enum: ['panoramic', 'relax']
    }
}, {
    timestamps: true
})


const Photo = model('Photo', photoSchema);

export default Photo