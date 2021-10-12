const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const libraryProvider = require("./libraryProvider");
const libraryDao = require("./libraryDao");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// 도서관 찜하기 
exports.setLikeLibrary = async function(userId, libraryId) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        let status;
        let insertLikeLibraryResult
        let updateLikeLibraryResult
        // 입력한 libraryId가 존재하는지 확인
        const checkLibraryResult = await libraryDao.checkLibrary(connection, libraryId)
        if(checkLibraryResult.length < 1) 
            return response(baseResponse_j.LIBRARYID_NOT_EXIST);

        // 도서관 찜한 기록이 있는지 확인
        // 없으면 insert
        const checkLikeStatusResult = await libraryDao.checkLikeStatus(connection, userId, libraryId)
        if(checkLikeStatusResult.length < 1) {
            insertLikeLibraryResult = await libraryDao.insertLikeLibrary(connection, userId, libraryId);
        }

        // 있으면 status확인해서 바꿔주기
        else if(checkLikeStatusResult[0].status == 1) {
            status = 0;
            updateLikeLibraryResult = await libraryDao.updateLikeLibrary(connection, userId, libraryId, status);
        }
        else if(checkLikeStatusResult[0].status == 0) {
            status = 1;
            updateLikeLibraryResult = await libraryDao.updateLikeLibrary(connection, userId, libraryId, status);
        }

        connection.release();
        return response(baseResponse.SUCCESS);
    }
    catch(err) {
        logger.error(`App - setLikeLibrary Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}