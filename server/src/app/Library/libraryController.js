const jwtMiddleware = require("../../../config/jwtMiddleware");
const libraryProvider = require("./libraryProvider");
const libraryService = require("./libraryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 8
 * API Name : 내 도서관 조회 API
 * [GET] /delibook/library/my-library
 */
exports.getMyLibrary = async function (req, res) {

    const userId = req.query.userId;

    const myLibraryResult = await libraryProvider.getMyLibrary(userId);

    return res.send(response(baseResponse.SUCCESS, myLibraryResult));
};
