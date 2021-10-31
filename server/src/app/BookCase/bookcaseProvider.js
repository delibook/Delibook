const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const bookcaseDao = require("./bookcaseDao");

// Provider: Read 비즈니스 로직 처리

exports.bookList = async function (userId, bookcaseName) {
 
    bookcaseTitle =  "%" + bookcaseName +  "%";
    const connection = await pool.getConnection(async (conn) => conn);
    const bookListResult = await bookcaseDao.selectBookListInBookCase(connection, userId,bookcaseTitle);
    connection.release();

    return bookListResult;
  
};

exports.bookcaseList = async function (userId) {
 
    const connection = await pool.getConnection(async (conn) => conn);
    const bookcaseListResult = await bookcaseDao.bookcaseList(connection, userId);
    connection.release();

    return bookcaseListResult;
  
};

exports.checkBookcase = async function (userId, bookcaseId) {
 
    
    const connection = await pool.getConnection(async (conn) => conn);
    const bookListResult = await bookcaseDao.checkBookCase(connection, userId,bookcaseId);
    connection.release();

    return bookListResult;
  
};

exports.checkBookcaseName = async function (userId,title) {
 
    
    const connection = await pool.getConnection(async (conn) => conn);
    const bookListResult = await bookcaseDao.checkBookCaseName(connection, userId,title);
    connection.release();

    return bookListResult;
  
};

exports.checkDeleteBookcase = async function (userId, bookcaseId) {
 
    
    const connection = await pool.getConnection(async (conn) => conn);
    const checkDeleteBookcaseRow = await bookcaseDao.checkDeleteBookcase(connection, userId,bookcaseId);
    connection.release();

    return checkDeleteBookcaseRow;
  
};