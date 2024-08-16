const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 40,
            required: [true, "Photo name is required"],
        },
        path: {
            type: String,
            required: [true, "image is required"],
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: [true, "createdBy is required"],
        },
    },
    { timestamps: true }
)
module.exports = mongoose.model("Photos", photoSchema)
