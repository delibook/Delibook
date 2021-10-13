const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const bookDao = require("./bookDao");

//특정 책 조회
exports.getBook = async function (bookId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const getBookInfoResult = await bookDao.getBookInfo(connection, bookId);

    if(getBookInfoResult.length < 1) 
        return response(baseResponse_j.BOOKID_NOT_EXIST);
    connection.release();

    return response(baseResponse_j.SUCCESS, getBookInfoResult);
  
};

//책목록 조회
exports.getBooks = async function (category) {
    condition = '';

    //카테고리를 입력했다면 조건 넣어주기
    if(category != null) {
        condition += `and bc.name = '`+category+`'`;
    }

    const connection = await pool.getConnection(async (conn) => conn);
    const getBooksInfoResult = await bookDao.getBooksInfo(connection, condition);
    connection.release();

    return getBooksInfoResult;
  
};