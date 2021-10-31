const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const bookcaseProvider = require("./bookcaseProvider");
const bookcaseDao = require("./bookcaseDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.bookLike = async function (userId, bookcaseId,bookId,type) {
    try {
        
        // 책장체크
        const checkBookcase = await bookcaseProvider.checkBookcase(userId,bookcaseId);
        if (checkBookcase.length < 1) 
            return errResponse(baseResponse.BOOKCASE_NOT_MATCH); //5004 해당유저의 책장이 아닙니다. 책장Id를 확인하세요

        const connection = await pool.getConnection(async (conn) => conn);
        // insert인 경우
        if (type=='insert'){
          let checkInsert = await bookcaseDao.checkInsert(connection,bookcaseId,bookId);
          connection.release(); 
            // 책장에 책이 이미 있는지 체크 
            if (checkInsert.length > 0 )  return errResponse(baseResponse.BOOKCASE_BOOK_ALREADY_EXISTS); //5005

          const insertBooktoCase = await bookcaseDao.Like(connection,bookcaseId,bookId);
          connection.release(); 

          checkInsert = await bookcaseDao.checkInsert(connection,bookcaseId,bookId);
          connection.release(); 
         
          return response(baseResponse.SUCCESS,{'책장 ID': checkInsert[0].bookcaseId,'추가된 책': checkInsert[0].bookId});
        }
        else 
        // 책장에서 책 빼기 
            {
                let checkInsert = await bookcaseDao.checkInsert(connection,bookcaseId,bookId);
                connection.release(); 
            // 책장에 책이 존재하는지 체크
            if (checkInsert.length <= 0 )  return errResponse(baseResponse.BOOKCASE_BOOK_NOT_EXISTS); //5006

                const dropBooktoCase = await bookcaseDao.unLike(connection,bookcaseId,bookId);
                connection.release(); 

                let checkDrop = await bookcaseDao.checkDrop(connection,bookcaseId,bookId);
                connection.release(); 
                return response(baseResponse.SUCCESS,{'책장 ID': checkDrop[0].bookcaseId,'제외된 책': checkDrop[0].bookId});

            }
    } catch (err) {
        logger.error(`App - Like Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.deleteBookcase = async function (userId, bookcaseId) {
    try {
        
        // 책장체크
        const checkBookcase = await bookcaseProvider.checkBookcase(userId,bookcaseId);
        if (checkBookcase.length < 1) 
            return errResponse(baseResponse.BOOKCASE_NOT_MATCH); //5004 해당유저의 책장이 아닙니다. 책장Id를 확인하세요

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteBookcaseRow = await bookcaseDao.deleteBookcase(connection,userId,bookcaseId);
        connection.release(); 

        const selectBookcaseThatDeleted = await bookcaseProvider.checkDeleteBookcase(userId,bookcaseId);   
        return response(baseResponse.SUCCESS,{'DeletedBookcaseId': selectBookcaseThatDeleted[0].deletedBookcaseId});
        
        
    }catch (err) {
        logger.error(`App - deleteBookCase Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.addBookcase = async function (userId, title) {
    try {
        
        // 해당 유저에게 동일한 이름의 책장이 있는지 체크 
        const checkBookcaseName = await bookcaseProvider.checkBookcaseName(userId,title);
        if (checkBookcaseName.length  >= 1) 
            return errResponse(baseResponse.BOOKCASE_NAME_REDUNDANT); //5007 동일한 책장이 존재합니다. 이름을 다시 설정해주세요.

        const connection = await pool.getConnection(async (conn) => conn);
        const addBookcaseRow = await bookcaseDao.addBookcase(connection,userId,title);
        connection.release(); 
        console.log(addBookcaseRow.insertId);
        return response(baseResponse.SUCCESS,{'addBookcaseId': addBookcaseRow.insertId});
        
        
    }catch (err) {
        logger.error(`App - addBookCase Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}