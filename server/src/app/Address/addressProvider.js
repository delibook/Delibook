const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const addressDao = require("./addressDao");

// Provider: Read 비즈니스 로직 처리

exports.getAddress = async function (userId) {
 

    const connection = await pool.getConnection(async (conn) => conn);
    const getAddressRow = await addressDao.selectAddress(connection, userId);

    return getAddressRow;
  
};

exports.checkUserAddress =async function(userId,addressId) 
{
    const connection = await pool.getConnection(async (conn) => conn);
    const checkAddressRow = await addressDao.checkUserAddress(connection, userId,addressId);

    return checkAddressRow;
}; 

exports.checkDeletedAddress =async function(userId,addressId) 
{
    const connection = await pool.getConnection(async (conn) => conn);
    const checkAddressRow = await addressDao.checkDeletedAddress(connection, userId,addressId);

    return checkAddressRow;
}; 

