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

/**
 * API No. 25
 * API Name : 도서관별 책 조회 API (+카테고리 선택)
 * [GET] /delibook/library/:libraryId/book
 */
 exports.getLibraryBook = async function (req, res) {
    const libraryId = req.params.libraryId;
    const category = req.query.category;
    const search = req.query.search;

    const getLibraryBookResult = await libraryProvider.getLibraryBook(libraryId, category, search);

    return res.send(getLibraryBookResult);
};

/**
 * API No. 27
 * API Name : 전체 도서관 조회 API + 거리별 필터
 * [GET] /delibook/library
 */
 exports.getLibrary = async function (req, res) {
   
    const userId = req.query.userId;
    const distance = req.query.distance;     //1이면 1km 이내, 2면 2km 이내,' ...
    const search = req.query.search;

    const getLibraryResult = await libraryProvider.getLibrary(userId, distance, search);

    return res.send(getLibraryResult);
};

/**
 * API No. 28
 * API Name : 특정 도서관 편의정보 조회 API
 * [GET] /delibook/library/:libraryId
 */
 exports.getLibraryDetail = async function (req, res) {
   
    const libraryId = req.params.libraryId;

    const getLibraryDetailResult = await libraryProvider.getLibraryDetail(libraryId);

    return res.send(getLibraryDetailResult);
};