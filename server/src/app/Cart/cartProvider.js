const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const cartDao = require("./cartDao");

// Provider: Read 비즈니스 로직 처리

exports.getCart = async function (userId) {
 
    
    const connection = await pool.getConnection(async (conn) => conn);
    const selectCart = await cartDao.selectCart(connection, userId);
    connection.release();
    const selectCost = await cartDao.selectCost(connection, userId);
    connection.release();
    selectCart.push(selectCost);
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

exports.canInsertCheck = async function (userId,libraryId) {
 
    const exist = '책가방에는 같은 도서관의 책만 담을 수 있습니다. 선택한 책을 책가방에 담을 경우 이전에 담은 책목록은 삭제됩니다.';
    const can='insert가능'
    const connection = await pool.getConnection(async (conn) => conn);
    const checkCartRow = await cartDao.canInsertCart(connection, userId,libraryId);
    connection.release();
   if (checkCartRow.length > 0)
    return exist;
   else 
    return can;
  
};

exports.getOneCart = async function (cartId) 
{
    const connection = await pool.getConnection(async (conn) => conn);
    const oneCartResult = await cartDao.getOneCart(connection,cartId);
    connection.release();

    return oneCartResult;
};