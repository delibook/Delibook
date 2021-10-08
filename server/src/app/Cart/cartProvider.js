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