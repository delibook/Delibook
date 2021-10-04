const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 1
 * API Name : 유저 생성 (회원가입) API
 * [POST] /app/users
 */
exports.postUsers = async function (req, res) {

    /**
     * Body:name,phone, email, password
     */
    const {name,email, phone,password} = req.body;

    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
         // 빈 값 체크
    if (!name)
    return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
     // 빈 값 체크
     if (!password)
     return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
      // 빈 값 체크
    if (!phone)
    return res.send(response(baseResponse.SIGNUP_PHONE_EMPTY));

    // 길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 길이 체크
    if (password.length > 15 || password.length < 7)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    

    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    // 기타 등등 - 추가하기


    const signUpResponse = await userService.createUser(
        email,
        password,
        name,
        phone
    );

    return res.send(signUpResponse);
};

/**
 * API No. 2
 * API Name : 마이페이지 조회 API
 * [GET] /delibook/user/my-page
 */
exports.getMyPage = async function (req, res) {

    const userId = req.query.userId;
    const caseId = req.query.caseId;
    let myCaseResult;

    if(caseId == null)
        myCaseResult = await userProvider.getMyCases(userId);
    else
        myCaseResult = await userProvider.getMyCase(userId, caseId);

    return res.send(myCaseResult);
};


/**
 * API No. 3
 * API Name : 특정 유저 조회 API
 * [GET] /app/users/{userId}
 */
exports.getUserById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const userByUserId = await userProvider.retrieveUser(userId);
    return res.send(response(baseResponse.SUCCESS, userByUserId));
};


// TODO: After 로그인 인증 방법 (JWT)
/**
 * API No. 4
 * API Name : 로그인 API
 * [POST] /app/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    // TODO: email, password 형식적 Validation
    // 빈 값 체크
    if (!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
     // 빈 값 체크
     if (!password)
         return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
     // 길이 체크
     if (email.length > 30)
     return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));
    // 길이 체크
    if (password.length > 15 || password.length < 7)
         return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
     // 이메일 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
         return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

    const signInResponse = await userService.postSignIn(email, password);

    return res.send(signInResponse);
};


/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
exports.patchUsers = async function (req, res) {

    // jwt - userId, path variable :userId

    const userIdFromJWT = req.verifiedToken.userId

    const userId = req.params.userId;
    const nickname = req.body.nickname;

    if (userIdFromJWT != userId) {
        res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
    } else {
        if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

        const editUserInfo = await userService.editUser(userId, nickname)
        return res.send(editUserInfo);
    }
};

/**
 * API No. 6
 * API Name : 이용내역 전체 조회 API
 * [GET] /delibook/user/usage
 */
exports.getUsages = async function (req, res) {

    const userId = req.query.userId;
    const type = req.query.type         // null : 전체내역, 1 : 대출내역, 2 : 반납내역

    const usagesResult = await userProvider.getUsagesResult(userId, type);

    return res.send(usagesResult);
};












/** JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
exports.check = async function (req, res) {
    const userIdResult = req.verifiedToken.userId;
    console.log(userIdResult);
    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};
