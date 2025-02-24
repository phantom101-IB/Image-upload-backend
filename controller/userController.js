const User = require("../models/userModel")
const { StatusCodes } = require("http-status-codes")
const { badRequestErr, notFoundErr, unAthorizeErr } = require("../errors")

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new badRequestErr("Email or Password not provided ")
    }

    const user = await User.findOne({ email })

    if (!user || user.length === 0) {
        throw new notFoundErr(`User with email ${email} not Found`)
    }
    const correctPassword = await user.comparePassword(password)
    if (!correctPassword) {
        throw new unAthorizeErr("Incorrect Password")
    }

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({ name: user.name, token, id: user._id })
}

const register = async (req, res) => {
    const user = await User.create({ ...req.body })
    const token = await user.createJWT()
    res.status(StatusCodes.CREATED).json({ name: user.name, token, id: user._id })
}

module.exports = {
    login,
    register,
}
