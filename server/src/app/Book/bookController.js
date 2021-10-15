const jwtMiddleware = require("../../../config/jwtMiddleware");
const bookProvider = require("./bookProvider");
const bookService = require("./bookService");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 38
 * API Name : 특정 책 정보  API
 * [GET] /delibook/book/:bookId
 */
 exports.getBook = async function (req, res) {
     bookId = req.params.bookId;

    const bookResult = await bookProvider.getBook(bookId);
    return res.send(bookResult);
};

/**
 * API No. 39
 * API Name : 책목록 조회(메인에서 대여버튼 눌렀을 때) API
 * [GET] /delibook/book
 */
 exports.getBooks = async function (req, res) {
    const category = req.query.category;
    const search = req.query.search;

    const booksResult = await bookProvider.getBooks(category, search);
    return res.send(response(baseResponse.SUCCESS, booksResult));
};

/**
 * API No. 42
 * API Name : 책 카테고리 조회 API (+도서관 별 책 카테고리)
 * [GET] /delibook/book/category
 */
 exports.getCategories = async function (req, res) {
     libraryId = req.query.libraryId;


    const getCategoriesResult = await bookProvider.getCategories(libraryId);
    return res.send(getCategoriesResult);
};