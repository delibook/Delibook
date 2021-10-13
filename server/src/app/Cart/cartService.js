const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const cartProvider = require("./cartProvider");
const cartDao = require("./cartDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// Service: Create, Update, Delete 비즈니스 로직 처리


exports.editCartBookNum = async function (userId,cartId,bookId,type) {
    //  // 해당 유저의 카트에 들어있는 책이 맞는지 
    try {
        
        // 해당 유저의 카트에 들어있는 책이 맞는지 
        const checkCart = await cartProvider.checkCart(userId,cartId,bookId);
        if (checkCart.length < 1) 
            return errResponse(baseResponse.CART_NOT_MATCH); //5202 해당유저의 카트에 들어있는 책이 아닙니다. 카트id와 책 id를 확인해주세요

        const connection = await pool.getConnection(async (conn) => conn);
        const editCartBookNum = await cartDao.editCartBookNum(connection,cartId,bookId, type);
          connection.release(); 
            console.log(editCartBookNum[0][0]);
          return response(baseResponse.SUCCESS,editCartBookNum[0][0]);
       
    } catch (err) {
        logger.error(`App - edit Cart Book Num Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.insertCart = async function (userId,bookId,libraryId) {
   
    try {
        
     //   해당 도서관에 해당 책이 존재하지 않습니다. 도서관 아이디와 책 아이디를 확인해주세요. 
        const checkBookAndLibrary = await cartProvider.checkBookAndLibrary(bookId,libraryId);
        if (checkBookAndLibrary.length < 1) 
            return errResponse(baseResponse.CART_BOOK_LIBRARY_NOT_EXIST); //5204 해당 도서관에 해당 책이 존재하지 않습니다. 도서관 아이디와 책 아이디를 확인해주세요. 

        const connection = await pool.getConnection(async (conn) => conn);
        const insertCartRow = await cartDao.insertCart(connection,userId,bookId, libraryId);
          connection.release(); 
            console.log(insertCartRow[0][0]);
          return response(baseResponse.SUCCESS,insertCartRow[0][0]);
       
    } catch (err) {
        logger.error(`App - insert Cart  Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.dropCart = async function (userId,cartId) {
         //  해당 유저의 카트가 맞는지
    try {
        // 해당 유저의 카트가 맞는지 
        const checkUserCart = await cartProvider.checkUserCart(userId,cartId);
        if (checkUserCart.length < 1) 
            return errResponse(baseResponse.CART_USER_NOT_MATCH); //5205 해당유저의 카트가 아닙니다. 카트아이다를 확인해주세요.

        const connection = await pool.getConnection(async (conn) => conn);
        const dropCartRow = await cartDao.dropCart(connection,userId,cartId);
          connection.release(); 
          return response(baseResponse.SUCCESS,{'삭제된 책가방':dropCartRow[0]} );
       
    } catch (err) {
        logger.error(`App -drop Cart  Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.dropCartBook = async function (userId,cartId,bookId) {
    //  해당 유저의 카트가 맞는지, 해당 유저의 카트에 들어있는 책이 맞는지 
try {
   
   // 해당 유저의 카트에 들어있는 책이 맞는지 
   const checkCart = await cartProvider.checkCart(userId,cartId,bookId);
   if (checkCart.length < 1) 
       return errResponse(baseResponse.CART_NOT_MATCH); //5202 해당유저의 카트에 들어있는 책이 아닙니다. 카트id와 책 id를 확인해주세요

   const connection = await pool.getConnection(async (conn) => conn);
   const dropCartBookRow = await cartDao.dropCartBook(connection,cartId,bookId);
     connection.release(); 
       
     return response(baseResponse.SUCCESS, {'삭제된 책':dropCartBookRow} );
  
} catch (err) {
   logger.error(`App - drop Book Cart  Service error\n: ${err.message}`);
   return errResponse(baseResponse.DB_ERROR);
}

}