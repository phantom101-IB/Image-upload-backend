const { StatusCodes } = require("http-status-codes")
const NotFoundMiddlware = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({ err: "Route Not Found" })
}

module.exports = NotFoundMiddlware
