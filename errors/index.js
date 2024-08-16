const badRequestErr = require("./Badrequest")
const CustomAPIError = require("./CustomeError")
const notFoundErr = require("./NotFoundErr")
const unAthorizeErr = require("./UnAuthorize")

module.exports = {
    badRequestErr,
    CustomAPIError,
    notFoundErr,
    unAthorizeErr,
}
