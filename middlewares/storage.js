require("dotenv").config()
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const path = require('path');


const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        const name = req.body.name
        return {
            filename: name + " " + Date.now() + path.extname(file.originalname),
        }
    },
})

const upload = multer({storage})
module.exports = upload