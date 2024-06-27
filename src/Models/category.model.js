import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength : 50
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    level: {
        type: Number,
        required: true,
    }
})

export default mongoose.model("categories", categorySchema)