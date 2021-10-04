const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const libraryDao = require("./libraryDao");


exports.getMyLibrary = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);

    const libraryListResult = await libraryDao.getLibraryList(connection, userId);
    connection.release();


    return libraryListResult;
};
