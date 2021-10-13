const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const cartDao = require("./cartDao");

// Provider: Read 비즈니스 로직 처리

exports.getCart = async function (userId) {
 
    
    const connection = await pool.getConnection(async (conn) => conn);
    const selectCart = await cartDao.selectCart(connection, userId);
    connection.release();

    return selectCart;
  
};

exports.checkCart= async function(userId,cartId,bookId){
    const connection = await pool.getConnection(async (conn) => conn);
    const checkCartResult = await cartDao.checkCart(connection, userId,cartId,bookId);
    connection.release();

    return checkCartResult;
};

exports.checkBookAndLibrary=async function (bookId,libraryId){
    const connection = await pool.getConnection(async (conn) => conn);
    const checkResult = await cartDao.checkBookAndLibrary(connection,bookId,libraryId);
    connection.release();

    return checkResult;

};

exports.checkUserCart= async function(userId,cartId){
    const connection = await pool.getConnection(async (conn) => conn);
    const checkCartResult = await cartDao.checkUserCart(connection, userId,cartId);
    connection.release();

    return checkCartResult;
};