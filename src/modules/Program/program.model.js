import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    name: { type: String, required: true },
    overview: {
        duration: { type: String, required: true },
        city: { type: String, required: true },
        description: { type: String, required: true },
    },
    schedule: [
        {
            time: { type: String },
            activity: { type: String },
        },
    ],
    images: [
        {
            public_id: {type: String},
            secure_url: {type: String}
        }
    ],
    folderId: {
        type: String,
        required: true,
    },
    // Ticket prices for adults and children
    ticketPriceAdult: { type: Number, required: true },
    ticketPriceChild: { type: Number, required: true },
    rate: {
        type: Number,
        default: 0
    }
},
{   timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

programSchema.virtual('Reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'programId'
})


const Program = mongoose.model("Program", programSchema);

export default Program;
