const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const libraryDao = require("./libraryDao");
const addressDao = require("../Address/addressDao");


exports.getMyLibrary = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);

    const myLibraryListResult = await libraryDao.getMyLibraryList(connection, userId);
    connection.release();


    return myLibraryListResult;
};

exports.getLibraryBook = async function (libraryId, category, search) {

    const connection = await pool.getConnection(async (conn) => conn);
    condition = ''
    if(category != null) {
        condition += `and bc.name = '`+category+`'`;
    }
    if(search != null) {
        condition += ` and b.name LIKE '%`+search+`%'`
    }

    // 입력한 libraryId가 존재하는지 확인
    const checkLibraryResult = await libraryDao.checkLibrary(connection, libraryId)
    if(checkLibraryResult.length < 1) 
        return response(baseResponse_j.LIBRARYID_NOT_EXIST);

    const libraryBookListResult = await libraryDao.getLibraryBookList(connection, libraryId, condition);
    connection.release();


    return response(baseResponse_j.SUCCESS, libraryBookListResult);
};

exports.getLibrary = async function (userId, distance, search) {

    const connection = await pool.getConnection(async (conn) => conn);
    const checkUserAddress = await addressDao.selectAddress(connection, userId);
    if(checkUserAddress.length < 1) {
        return response(baseResponse_j.USER_ADDRESS_EMPTY);
    }

    condition = ''
    if(distance != null) {
        condition += `and (6371 * acos( cos( radians(a.latitude) ) * cos( radians(l.latitude) ) * cos( radians(a.longitude) - radians(l.longitude) ) + sin( radians(a.latitude) ) * sin( radians(l.latitude)))) <`+distance;
    }
    if(search != null) {
        condition += ` and l.name LIKE '%`+search+`%'`
    }
    const libraryListResult = await libraryDao.getLibraryList(connection, userId, condition);
    connection.release();

    return response(baseResponse_j.SUCCESS, libraryListResult);
};

exports.getLibraryDetail = async function (libraryId) {

    const connection = await pool.getConnection(async (conn) => conn);
    
     // 입력한 libraryId가 존재하는지 확인
     const checkLibraryResult = await libraryDao.checkLibrary(connection, libraryId)
     if(checkLibraryResult.length < 1) 
         return response(baseResponse_j.LIBRARYID_NOT_EXIST);
    
    const libraryDetailListResult = await libraryDao.getLibraryDetailList(connection, libraryId);
    connection.release();


    return response(baseResponse_j.SUCCESS, libraryDetailListResult);
};