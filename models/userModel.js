const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        maxlength: 50,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
        unique: true,
    },
    password: {
        type: String,
        minlength: 6,
        required: [true, "password is required"],
    },
})

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return (token = jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFE,
        }
    ))
}

UserSchema.methods.comparePassword = async function (providedPassword) {
    const isMatch = await bcrypt.compare(providedPassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)
