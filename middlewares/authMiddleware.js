const jwt = require("jsonwebtoken")
const { unAthorizeErr } = require("../errors")
const { StatusCodes } = require("http-status-codes")

const AuthorizeMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders || !authHeaders.startsWith("Bearer ")) {
        throw new unAthorizeErr("No Authorization Present")
    }

    const payload = authHeaders.split(" ")[1]

    try {
        const token = jwt.verify(payload, process.env.JWT_SECRET)
        const { name, userId } = token
        req.user = { name, userId }
        next()
    } catch (error) {
        throw new unAthorizeErr("Access Denied")
    }
}

module.exports = AuthorizeMiddleware
