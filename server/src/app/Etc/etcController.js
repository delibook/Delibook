const jwtMiddleware = require("../../../config/jwtMiddleware");
const etcProvider = require("./etcProvider");
const etcService = require("./etcService");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const { query } = require("winston");


/**
 * API No. 30
 * API Name : 공지사항조회 API
 * [GET] /delibook/etc/notice
 */
exports.getNotice = async function (req,res) {
    
    
    contentId = req.query.contentId;
    if (contentId){
        const noticeContentResult = await etcProvider.getNoticeContent(contentId); 
        return res.send(response(baseResponse.SUCCESS, noticeContentResult));
    }
    else {
        const noticeResult = await etcProvider.getNotice();
         return res.send(response(baseResponse.SUCCESS, noticeResult));
    }
};


/**
 * API No. 31
 * API Name : 문의하기 API
 * [POST] /delibook/etc/inquiry
 */
 exports.inquiry = async function (req,res) {
    
    
    title = req.body.title;
    content =req.body.content;
    userId= req.query.userId;
    if (!title){ 
        return res.send(errResponse(baseResponse.TITLE_EMPTY));
    }
    if(!content){return res.send(errResponse(baseResponse.CONTENT_EMPTY));}

    const inquiryResult = await etcService.inquiry(title,content,userId); 
    
    return res.send(inquiryResult);
    
};

