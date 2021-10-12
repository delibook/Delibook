const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const addressProvider = require("./addressProvider");
const addressDao = require("./addressDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리

exports.ServicePatchAddress = async function (userId, addressId,address, detailAddress, latitude, longitude, isMain) {
    try {
        
        updateParams = [address, detailAddress, latitude, longitude, isMain ,userId, addressId]
        const connection = await pool.getConnection(async (conn) => conn);
        const editAddressResult = await addressDao.updateAddress(connection, updateParams);
        connection.release();
        console.log(editAddressResult);

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editAddress Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.postAddress = async function (userId, address, detailAddress, latitude, longitude) {
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const postAddressInfoResult = await addressDao.postAddressInfo(connection, userId, address, detailAddress, latitude, longitude)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - postAddress Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}