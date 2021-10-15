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

exports.deleteAddress = async function (userId,addressId) {
    try {

        // 해당 유저의 주소 id가 맞는지 체크 
        const checkUserAddressRow = await addressProvider.checkUserAddress(userId,addressId);
        if (checkUserAddressRow < 1 )
             return errResponse(baseResponse.ADDRESS_USER_NOT_MATCH ); //5106 주소아이디와 유저아이디가 맞지 않습니다. 확인해주세요

        const checkDeletedAddressRow = await addressProvider.checkDeletedAddress(userId,addressId) ;
        if  (checkDeletedAddressRow >= 1 )
        return errResponse(baseResponse.ADDRESS_ALREADY_DELETED); //5108 이미 삭제된 주소입니다.

        const connection = await pool.getConnection(async (conn) => conn);
        const deleteAddressRow = await addressDao.deleteAddress(connection, userId, addressId)
        connection.release();

        return response(baseResponse.ADDRESS_DELETE_SUCCESS); //5107 주소삭제 성공

    } catch (err) {
        logger.error(`App - setMainAddress Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}


exports.setMainAddress = async function (userId,addressId) {
    try {

        // 해당 유저의 주소 id가 맞는지 체크 
        const checkUserAddressRow = await addressProvider.checkUserAddress(userId,addressId);
        if (checkUserAddressRow < 1 )
             return errResponse(baseResponse.ADDRESS_USER_NOT_MATCH ); //5106 주소아이디와 유저아이디가 맞지 않습니다. 확인해주세요

        const connection = await pool.getConnection(async (conn) => conn);
        const setMainAddressRow = await addressDao.setMainAddress(connection, userId, addressId)
        connection.release();

        return response(baseResponse.SUCCESS,setMainAddressRow[0]);

    } catch (err) {
        logger.error(`App - setMainAddress Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}