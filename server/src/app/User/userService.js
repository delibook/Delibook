const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");


exports.createUser = async function (email, password, name,phone) {
    try {
        // 이메일 중복 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length > 0)
            return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

        // 비밀번호 암호화
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const insertUserInfoParams = [email, hashedPassword, name,phone];

        const connection = await pool.getConnection(async (conn) => conn);

        const userIdResult = await userDao.insertUserInfo(connection, insertUserInfoParams);
        console.log(`추가된 회원 : ${userIdResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


// TODO: After 로그인 인증 방법 (JWT)
exports.postSignIn = async function (email, password) {
    try {
        // 이메일 여부 확인
        const emailRows = await userProvider.emailCheck(email);
        if (emailRows.length < 1) return errResponse(baseResponse.SIGNIN_EMAIL_WRONG);

        const selectEmail = emailRows[0].email

        // 비밀번호 확인
        const hashedPassword = await crypto
            .createHash("sha512")
            .update(password)
            .digest("hex");

        const selectUserPasswordParams = [selectEmail, hashedPassword];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams);

        if (passwordRows[0].password !== hashedPassword) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(email);

        if (userInfoRows[0].status === "INACTIVE") {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === "DELETED") {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].id );// DB의 userId

        //토큰 생성 Service
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].id,
            }, // 토큰의 내용(payload)
            secret_config.jwtsecret, // 비밀키
            {
                expiresIn: "365d",
                subject: "userInfo",
            } // 유효 기간 365일
        );

        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id,'userEmail': userInfoRows[0].email, 'jwt': token});

    } catch (err) {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//비밀번호 변경
exports.patchPassword = async function (userId, password, modifyPassword, checkPassword) {
    try {
        // 비밀번호 암호화
        const hashedPassword = await crypto
        .createHash("sha512")
        .update(password)
        .digest("hex");

        const connection = await pool.getConnection(async (conn) => conn);

        //유저 비밀번호가 맞는지 확인
        const checkUserPasswordResult = await userDao.checkUserPassword(connection, userId);
        if(checkUserPasswordResult[0].password != hashedPassword) {
            return response(baseResponse_j.PASSWORD_NOT_MATCH);
        }

        //맞을 경우 변경하려는 비밀번호가 다른지 확인
        else if(password == modifyPassword)
            return response(baseResponse_j.MODIFY_PASSWORD_EQUAL);

        // 변경할 비밀번호 암호화
        const hashedModifyPassword = await crypto
        .createHash("sha512")
        .update(modifyPassword)
        .digest("hex");

        const patchPasswordInfoResult = await userDao.patchPasswordInfo(connection, userId, hashedModifyPassword);
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - patchPassword Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//탈퇴
exports.withdraw = async function (userId,password) {
    try {
            
            // 비밀번호 확인
                const hashedPassword = await crypto
                .createHash("sha512")
                .update(password)
                .digest("hex");

                
            const selectUserPasswordParams = [userId, hashedPassword];
            const passwordRows = await userProvider.passwordCheckToId(selectUserPasswordParams);
    
            if (passwordRows[0].password !== hashedPassword) {
                return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG);
            }

        const connection = await pool.getConnection(async (conn) => conn);
        const withdrawRow = await userDao.withdrawUser(connection, userId);
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - withdrawUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//대출 정보 입력 && 대출책 재고 차감 && cart status 변경
exports.insertBuyInfo = async function(userId, cartId, price) {
    const connection = await pool.getConnection(async (conn) => conn);
    console.log(userId, cartId, price)
    try{
        connection.beginTransaction();

        //대출정보 삽입
        const insertLoanInfoResult = await userDao.insertLoanInfo(connection, userId, cartId, price);

        //장바구니 책 수량 조회하여 재고에서 빼기
        const getBookAmountResult = await userDao.getBookAmount(connection, cartId);
        for (let i = 0;i<getBookAmountResult.length;i++) {
            const updateBookAmountResult = await userDao.updateBookAmount(connection, getBookAmountResult[i].bookId, getBookAmountResult[i].quantity);
        }

        //cart status 바꾸기
        const updateCartResult = await userDao.updateCart(connection, cartId);

        connection.commit();
        connection.release();
        return response(baseResponse.SUCCESS);
    }catch (e) {
        console.log(`service error : ${e.message}`);
        connection.rollback()
        return errResponse(baseResponse.DB_ERROR);
    }
}