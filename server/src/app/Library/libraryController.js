const jwtMiddleware = require("../../../config/jwtMiddleware");
const libraryProvider = require("./libraryProvider");
const libraryService = require("./libraryService");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
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

/**
 * API No. 24
 * API Name : 도서관 찜하기/빼기 버튼 API
 * [POST] /delibook/library/:libraryId/like
 */
exports.likeLibrary = async function (req, res) {

    const userId = req.query.userId;
    const libraryId = req.params.libraryId;

    const setLikeLibraryResult = await libraryService.setLikeLibrary(userId, libraryId);

    return res.send(setLikeLibraryResult);
};