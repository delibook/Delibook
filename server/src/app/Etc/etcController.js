const jwtMiddleware = require("../../../config/jwtMiddleware");
const etcProvider = require("./etcProvider");
const etcService = require("./etcService");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const { query } = require("winston");


/**
 * API No. 31
 * API Name : 공지사항조회 API
 * [GET] /delibook/etc/notice
 */
exports.getNotice = async function (req,res) {
    
    userId = req.query.userId;
    const noticeResult = await etcProvider.getNotice();
    
    return res.send(response(baseResponse.SUCCESS, noticeResult));
};

