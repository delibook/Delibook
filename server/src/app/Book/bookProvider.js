const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const bookDao = require("./bookDao");
const libraryDao = require("../Library/libraryDao");

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
exports.getBooks = async function (category, search) {
    condition = '';

    //카테고리를 입력했다면 조건 넣어주기
    if(category != null) {
        condition += `and bc.name = '`+category+`'`;
    }

    if(search != null) {
        condition += ` and b.name LIKE '%`+search+`%'`
    }
    const connection = await pool.getConnection(async (conn) => conn);
    const getBooksInfoResult = await bookDao.getBooksInfo(connection, condition);
    connection.release();

    return getBooksInfoResult;
  
};

//책 카테고리 조회
exports.getCategories = async function (libraryId) {
    const connection = await pool.getConnection(async (conn) => conn);
    let condition = ''
    let checkLibraryResult;

    //카테고리를 입력했다면 조건 넣어주기
    if(libraryId != null) {
        checkLibraryResult = await libraryDao.checkLibrary(connection, libraryId);
        if(checkLibraryResult.length < 1) {
            return response(baseResponse_j.LIBRARYID_NOT_EXIST);
        }
        else {
            condition += `and l.id = ${libraryId}`;
        }
    }

    const getCategoriesListResult = await bookDao.getCategoriesList(connection, condition);
    connection.release();

    return response(baseResponse_j.SUCCESS, getCategoriesListResult);
  
};