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
        
        
        const checkBookcase = await bookcaseProvider.checkBookcase(userId,bookcaseId);
        if (checkBookcase.length < 1) 
            return errResponse(baseResponse.BOOKCASE_NOT_MATCH); //5004 해당유저의 책장이 아닙니다. 책장Id를 확인하세요

        const connection = await pool.getConnection(async (conn) => conn);
        if (type=='insert'){
          let checkInsert = await bookcaseDao.checkInsert(connection,bookcaseId,bookId);
          connection.release(); 
            if (checkInsert.length > 0 )  return errResponse(baseResponse.BOOKCASE_BOOK_ALREADY_EXSITS); //

          const insertBooktoCase = await bookcaseDao.Like(connection,bookcaseId,bookId);
          connection.release(); 

          checkInsert = await bookcaseDao.checkInsert(connection,bookcaseId,bookId);
          connection.release(); 
         
          return response(baseResponse.SUCCESS,{'책장 ID': checkInsert[0].bookcaseId,'추가된 책': checkInsert[0].bookId});
        }
        else 
            {const dropBooktoCase = await bookcaseDao.unLike(connection,bookcaseId,bookId);
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