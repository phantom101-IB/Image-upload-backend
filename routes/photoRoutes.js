const express = require("express")
const route = express.Router()

const { getAllPics, getAllUserPics } = require("../controller/pictureController")

route.route("/").get(getAllPics)
route.route("/user/:id").get(getAllUserPics)

module.exports = route
