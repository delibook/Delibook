const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponse_j = require("../../../config/baseResponseStatus_j");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

const axios = require("../../../node_modules/axios");
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');
const phone = require('../../../config/phone');

const crypto = require('crypto');
const {smtpTransport} = require('../../../config/email');

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
 * API Name : 로그인 API
 * [POST] /delibook/user/login
 * body : email, passsword
 */
exports.login = async function (req, res) {

    const {email, password} = req.body;

    //TODO: email, password 형식적 Validation
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
 * API No. 4
 * API Name : 비밀번호 변경 API
 * [POST] /delibook/user/password-modify
 */
 exports.patchPassword = async function (req, res) {

    const userId = req.query.userId;
    const {password, modifyPassword, checkPassword} = req.body;

    //빈 값 체크
    if(!password) 
        return res.send(response(baseResponse_j.USER_PASSWORD_EMPTY));
    else if(!modifyPassword)
        return res.send(response(baseResponse_j.MODIFY_PASSWORD_EMPTY));
    else if(!checkPassword)
        return res.send(response(baseResponse_j.CHECK_PASSWORD_EMPTY));

    //한번 더 확인할 비밀번호가 같은지 확인
    else if(modifyPassword != checkPassword)
        return res.send(response(baseResponse_j.CHECK_PASSWORD_NOT_MATCH));

    const patchPasswordResult= await userService.patchPassword(userId, password, modifyPassword, checkPassword);

    return res.send(patchPasswordResult);
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

/**
 * API No. 34
 * API Name : 휴대폰 인증 API
 * [POST] /delibook/user/phone/auth
 */
exports.verifyPhoneNumber = async function (req, res) {
    const phoneNumber = req.body.phoneNumber;

    if (!phoneNumber)
        res.send(errResponse(baseResponse_j.PHONE_NUMBER_EMPTY));
    if(phoneNumber.length != 11) {
        res.send(errResponse(baseResponse_j.PHONE_NUMBER_ERROR_TYPE));
    }

    Cache.del(phoneNumber);   //인증번호 다시 요청할 경우를 위해

    //인증번호 생성(랜덤 4자리)
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    Cache.put(phoneNumber, verifyCode.toString(), 180000);  //3분 제한시간
    axios({
        method: phone.method,
        json: true,
        url: phone.url,
        headers: {
            'Content-Type': 'application/json',
            'x-ncp-iam-access-key': phone.accessKey,
            'x-ncp-apigw-timestamp': phone.date,
            'x-ncp-apigw-signature-v2': phone.signature,
        },
        data: {
            type: 'SMS',
            contentType: 'COMM',
            countryCode: '82',
            from: phone.number,
            content: `[Delibook 본인 확인] 인증번호 [${verifyCode}]를 입력해 주세요.`,
            messages: [
                {
                    to: `${phoneNumber}`,
                },
            ],
        },
    })
        .then(function (res) {
            res.send(response(baseResponse.SUCCESS));
        })
        .catch((err) => {
            if (err.res == undefined) {
                res.send(response(baseResponse.SUCCESS));
            } else res.send(errResponse(baseResponse_j.SMS_SEND_ERROR));
        });

};


/**
 * API No. 35
 * API Name : 이메일 인증 API
 * [POST] /delibook/user/email/auth
 */
 exports.verifyEmail = async function (req,res) {
    const email = req.body.email;

    Cache.del(email);
    
    //빈값 체크
    if(!email)
        return res.send(errResponse(baseResponse.USER_USEREMAIL_EMPTY))
    // 형식 체크 (by 정규표현식)
    if (!regexEmail.test(email))
        return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));
    //길이 체크
    if (email.length > 30)
        return res.send(response(baseResponse.SIGNUP_EMAIL_LENGTH));

    const token = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    const data = { // 데이터 정리
        token
    };

    Cache.put(email, token);

    const mailOptions = {
        from: "susie000301@naver.com",
        to: `${email}`,
        subject: "딜리북 인증메일",
        text: `[Delibook 본인 확인] 인증번호 [${token}]를 입력해 주세요.`
    };

    await smtpTransport.sendMail(mailOptions, (error, responses) =>{
        if(error){
            res.send(errResponse(baseResponse_j.EMAIL_SEND_ERROR))
        }else{
            res.send(response(baseResponse.SUCCESS));
        }
        smtpTransport.close();
    });
};