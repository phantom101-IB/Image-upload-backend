const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors")

const errHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Something went wrong, pls try again later",
    })
}

module.exports = errHandlerMiddleware
