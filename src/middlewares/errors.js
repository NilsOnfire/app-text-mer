const { HTTP_ERROR_CONSTANTS } = require("../constants/errors");

exports.notFoundMiddleWare = function (req, res) {
    res.status(404).json({ message: HTTP_ERROR_CONSTANTS.NOT_FOUND });
}