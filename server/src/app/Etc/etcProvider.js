const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");


const etcDao = require("./etcDao");


exports.getNotice = async function () {

    const connection = await pool.getConnection(async (conn) => conn);

    const noticeListResult = await etcDao.getNoticeList(connection);
    connection.release();


    return noticeListResult;
};

exports.getNoticeContent = async function (contentId) {

    const connection = await pool.getConnection(async (conn) => conn);

    const noticeContentResult = await etcDao.getNoticeContent(connection,contentId);
    connection.release();


    return noticeContentResult;
};


exports.getAskedList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);

    const askedListResult = await etcDao.getAskedList(connection);
    connection.release();


    return askedListResult;
};

exports.getAsked = async function (contentId) {

    const connection = await pool.getConnection(async (conn) => conn);

    const askedResult = await etcDao.getAsked(connection,contentId);
    connection.release();


    return askedResult;
};