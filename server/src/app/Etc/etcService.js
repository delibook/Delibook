const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const etcProvider = require("./etcProvider");
const etcDao = require("./etcDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.inquiry = async function (title,content,userId) {
    try {

        const connection = await pool.getConnection(async (conn) => conn);
        const insertInquiry = await etcDao.insertInquiry(connection,title,content,userId);
        connection.release(); 
        

        //const selectInquiry = await etcProvider.selectInquiry()
         
        return response(baseResponse.SUCCESS, {"추가된 문의 Id": insertInquiry.insertId});
        }
       

            
   catch (err) {
        logger.error(`App - inquiry Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}