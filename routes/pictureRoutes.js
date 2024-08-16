const express = require("express")
const route = express.Router()

const {
    getAllPics,
    getAllUserPics,
    getPic,
    createPic,
    updatePic,
    deletePic,
} = require("../controller/pictureController")

route.route("/").get(getAllPics).post(createPic)
route.route("/users/:name").get(getAllUserPics)
route.route("/:id").get(getPic).patch(updatePic).delete(deletePic)

module.exports = route
