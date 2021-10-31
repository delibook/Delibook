const jwtMiddleware = require("../../../config/jwtMiddleware");
const bookcaseProvider = require("./bookcaseProvider");
const bookcaseService = require("./bookcaseService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const { query } = require("winston");


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

/**
 * API No. 23
 * API Name : 마이책장에 책 넣기/ 빼기  API
 * [GET] /delibook/bookcase/:bookcaseId/:bookId/like 
 */
 exports.insertBook = async function (req, res) {

    /**
     * paramiter: bookcaseId, bookId, 
     * Path variable : type (insert, drop)  
     */
    const bookcaseId = req.params.bookcaseId;
    const bookId = req.params.bookId ;
    const userId= req.verifiedToken.userId;
    const type = req.query.type; 

    if (!bookcaseId) return res.send(errResponse(baseResponse.BOOKCASE_ID_EMPTY)); //5002, 책장ID을 입력하세요.
    if (!bookId) return res.send(errResponse(baseResponse.BOOK_ID_EMPTY));//4901 책 id 입력
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ; 
    if (!type) return res.send(errResponse(baseResponse. BOOKCASE_ACTION_TYPE_EMPTY)) ; //5003

    // 해당 책장이 없을때, 해당 책이 없을때 (의미적벨리데이션..)
    // 중복체크....ㅅㅂ

    const bookToBookcase = await bookcaseService.bookLike(userId, bookcaseId,bookId,type);
    return res.send(bookToBookcase);
};
/**
 * API No. 44
 * API Name : 책장생성  API
 * [patch] /delibook/bookcase/add
 */
 exports.addBookcase = async function (req, res) {

    
   
    const userId= req.query.userId;
    const title=req.body.title ;


    if (!title) return res.send(errResponse(baseResponse.BOOKCASE_NAME_EMPTY)); //5000, 책장명을 입력하세요.
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY)) ; 

    const addBookcaseResult = await bookcaseService.addBookcase(userId,title);
    return res.send(addBookcaseResult);
};
/**
 * API No. 44
 * API Name : 특정책장제거  API
 * [patch] /delibook/bookcase/delete
 */
 exports.deleteBookcase = async function (req, res) {

    
    const bookcaseId = req.query.bookcaseId;
    const userId= req.query.userId;


    if (!bookcaseId) return res.send(errResponse(baseResponse.BOOKCASE_ID_EMPTY)); //5002, 책장ID을 입력하세요.
    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY)) ; 

    const deleteBookcaseResult = await bookcaseService.deleteBookcase(userId, bookcaseId);
    return res.send(deleteBookcaseResult);
};