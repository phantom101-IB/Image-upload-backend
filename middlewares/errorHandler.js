const { StatusCodes } = require("http-status-codes")
const { CustomAPIError } = require("../errors")

const errHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }

    if (err.code && err.code === 11000) {
        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ msgS: `User with email: ${err.keyValue["email"]} already exist` })
    }

    if (err.name === "ValidationError") {
        // const msge = Object.values(err.errors)
        //     .map((item) => item.message)
        //     .join(",")

        return res
            .status(StatusCodes.FORBIDDEN)
            .json({ msgS: "Password can't be less than 6 Chars" })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        msg: "Something went wrong, pls try again later",
    })
}

module.exports = errHandlerMiddleware
