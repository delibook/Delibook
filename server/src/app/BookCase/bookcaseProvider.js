const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const bookcaseDao = require("./bookcaseDao");

// Provider: Read 비즈니스 로직 처리

exports.bookList = async function (userId, bookcaseName) {
 
    bookcaseTitle =  "%" + bookcaseName +  "%";
    const connection = await pool.getConnection(async (conn) => conn);
    const bookListResult = await bookcaseDao.selectBookListInBookCase(connection, userId,bookcaseTitle);
    connection.release();

    return bookListResult;
  
};