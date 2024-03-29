const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserList = async function (email) {
  if (!email) {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUser(connection);
    connection.release();

    return userListResult;

  } else {
    const connection = await pool.getConnection(async (conn) => conn);
    const userListResult = await userDao.selectUserEmail(connection, email);
    connection.release();

    return userListResult;
  }
};

exports.retrieveUser = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserId(connection, userId);

  connection.release();

  return userResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.passwordCheckToId = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPasswordForWithdraw(
      connection,
      selectUserPasswordParams
  );
  connection.release();
  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};

exports.getMyCases = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const casesListResult = await userDao.getCasesList(connection, userId);
  connection.release();

  return response(baseResponse.SUCCESS, casesListResult);
};

exports.getMyCase = async function (userId, caseId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const checkUserList = await userDao.retrieveCaseList(connection, caseId);

  if(checkUserList.length<1)
    return response(baseResponse.CASE_NOT_EXIST)
  else if(checkUserList[0].userId != userId)
    return response(baseResponse.USERID_CASE_NOT_MATCH);

  const caseListResult = await userDao.getCaseList(connection, caseId);
  connection.release();


  return response(baseResponse.SUCCESS, caseListResult);
};

//이용내역 조회
exports.getUsagesResult = async function (userId, type) {
  let condition = ''
  let loan_condition = ''
  switch(type) {
    case '1':
      condition += 'and (ui.status = 0 or ui.status = 1)';
      loan_condition += 'date_format(ui.toReturnDate,\'%Y-%m-%d\') as toReturnDate,\n' +
          '       (case\n' +
          '           when datediff(now(), ui.toReturnDate) <= 0\n' +
          '           then 0\n' +
          '           else datediff(now(), ui.toReturnDate)\n' +
          '           end) as lateDateCount,\n' +
          '       (case\n' +
          '           when datediff(now(), ui.toReturnDate) <= 0\n' +
          '           then l.tip\n' +
          '           else l.tip+l.lateFee*(datediff(now(), ui.toReturnDate))\n' +
          '           end) as price,'
      break
    case '2':
      condition += 'and (ui.status = 3 or ui.status = 4)';
      break
  }
  const connection = await pool.getConnection(async (conn) => conn);
  const usagesListResult = await userDao.getUsagesList(connection, userId, condition, loan_condition);

  connection.release();
  return response(baseResponse.SUCCESS, usagesListResult);
};

// 이름, 휴대전화 조회
exports.checkUser = async function (name, phoneNumber) {
  
  const connection = await pool.getConnection(async (conn) => conn);
  const checkUserInfoResult = await userDao.checkUserInfo(connection, name, phoneNumber);

  connection.release();
  return checkUserInfoResult;
};

//아이디 찾기
exports.getId = async function (name, phoneNumber) {
  
  const connection = await pool.getConnection(async (conn) => conn);
  let getIdInfoResult = await userDao.checkUserInfo(connection, name, phoneNumber);

  connection.release();
  return getIdInfoResult;
};