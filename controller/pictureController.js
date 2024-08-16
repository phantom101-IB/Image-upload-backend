const Photos = require("../models/picturesModel")
const { StatusCodes } = require("http-status-codes")
const { badRequestErr, notFoundErr } = require("../errors")

const getAllPics = async (req, res) => {
    const photo = await Photos.find({}).sort("createdAt")

    if (!photo || photo.length === 0) {
        throw new badRequestErr("No Photos to show")
    }
    res.status(StatusCodes.OK).json({ photo })
}

const getAllUserPics = async (req, res) => {
    const {
        user: { userId },
        params: { name: username },
    } = req

    console.log(username)

    const photo = await Photos.find({ createdBy: userId, name: username }).sort(
        "createdAt"
    )

    if (!photo || photo.length === 0) {
        throw new notFoundErr(`Not Photos available for user: ${userId}`)
    }

    res.status(StatusCodes.OK).json({ photo })
}

const getPic = async (req, res) => {
    const {
        user: { userId },
        params: { id: photoId },
    } = req

    const photo = await Photos.findById({ _id: photoId, createdBy: userId })

    if (!photo || photo.length === 0) {
        throw new notFoundErr(`No Photo with ID: ${photoId} found`)
    }
    res.status(StatusCodes.OK).json({ photo })
}

const createPic = async (req, res) => {
    req.body.createdBy = req.user.userId
    req.body.path = req.file.filename
    const photo = await Photos.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ photo })
}

const updatePic = async (req, res) => {
    const {
        user: { userId },
        params: { id: photoId },
    } = req

    const photo = await Photos.findByIdAndUpdate(
        {
            _id: photoId,
            createdBy: userId,
        },
        req.body,
        { new: true, runValidators: true }
    )

    if (!photo || photo.length === 0) {
        throw new notFoundErr(`Not Photo with id: ${photoId} found`)
    }
    res.status(StatusCodes.OK).json({ photo })
}

const deletePic = async (req, res) => {
    const {
        user: { userId },
        params: { id: photoId },
    } = req
    const photo = await Photos.findByIdAndDelete({
        _id: photoId,
        createdBy: userId,
    })

    if (!photo || photo.length === 0) {
        throw new notFoundErr(`No Photo with id: ${photoId}`)
    }

    res.status(StatusCodes.OK).json({
        msg: "Photo Deleted Successful",
        success: true,
    })
}

module.exports = {
    getAllPics,
    getAllUserPics,
    getPic,
    createPic,
    updatePic,
    deletePic,
}
