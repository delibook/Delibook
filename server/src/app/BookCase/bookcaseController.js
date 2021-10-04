const jwtMiddleware = require("../../../config/jwtMiddleware");
const bookcaseProvider = require("../../app/BookCase/bookcaseProvider");
const bookcaseService = require("../../app/BookCase/bookcaseService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 7
 * API Name : 특정 책장의 책 조회 API
 * [GET] /delibook/bookcase/books
 */
 exports.getBookList = async function (req, res) {

    /**
     * Path Variable: bookcaseName
     */
    const bookcaseName = req.query.bookcaseName;
    const userId= req.verifiedToken.userId;
    if (!bookcaseName) return res.send(errResponse(baseResponse.BOOKCASE_NAME_EMPTY)); //5000, 책장명을 입력하세요.
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;

    const booklistInbookcase = await bookcaseProvider.bookList(userId, bookcaseName);
    return res.send(response(baseResponse.SUCCESS, booklistInbookcase));
};
