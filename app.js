require("dotenv").config()
require("express-async-errors")
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

// internal import

const notFoundware = require("./middlewares/notFoundMiddleware")
const connectDB = require("./db/db")
const userRoute = require("./routes/userRoutes")
const photoRoute = require("./routes/pictureRoutes")
const allRoute = require("./routes/photoRoutes")
const errHandler = require("./middlewares/errorHandler")
const AuthWare = require("./middlewares/authMiddleware")
const upload = require("./middlewares/storage")

// external middleware usage

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("./public"))
app.use(cors())

const conn = mongoose.createConnection(process.env.MONGO_LOCAL);

let gfs;

conn.once("open", ()=>{
  gfs = new mongoose.mongo.GridFSBucket(conn.db)
})

// routes usage
app.use("/api/v1/All", allRoute)
app.use("/api/v1/photos", AuthWare, upload.single("image"), photoRoute)
app.use("/api/v1/auth", userRoute)
app.use("/api/v1/All/:filename", async (req,res)=>{
    gfs.openDownloadStreamByName(req.params.filename).pipe(res)
})

app.use(errHandler)
app.use(notFoundware)

const PORT = 3000 || process.env.PORT

const start = async () => {
    try {
        await connectDB(process.env.MONGO_LOCAL)
        app.listen(PORT, () => {
            console.log(`Port ${PORT} is live...`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()
