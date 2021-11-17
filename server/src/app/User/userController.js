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

const request = require('request');

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

    const userId = req.verifiedToken.userId;
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

    const userId = req.verifiedToken.userId;
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
 * API Name : 회원탈퇴 API
 * [PATCH] /delibook/user/withdraw
 */
 exports.withdraw = async function (req, res) {

    const userId = req.body.userId;
    const password=req.body.password;
   
    withdrawResult = await userService.withdraw(userId,password);

    return res.send(withdrawResult);
};

/**
 * API No. 7
 * API Name : 이용내역 전체 조회 API
 * [GET] /delibook/user/usage
 */
exports.getUsages = async function (req, res) {

    const userId = req.verifiedToken.userId;
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
    const {name, phoneNumber} = req.body;

    if(!name)
        return res.send(errResponse(baseResponse_j.USER_NAME_EMPTY));
    else if(!phoneNumber)
        return res.send(errResponse(baseResponse_j.PHONE_NUMBER_EMPTY));
    else if(phoneNumber.length != 11) {
        return res.send(errResponse(baseResponse_j.PHONE_NUMBER_ERROR_TYPE));
    }

    const checkUserResult = await userProvider.checkUser(name, phoneNumber);
    if(checkUserResult.length < 1) {
        return res.send(response(baseResponse_j.USER_PHONE_NOT_MATCH))
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

/**
 * API No. 37
 * API Name : 아이디 찾기 API
 * [GET] /delibook/user/findId-form
 */
 exports.findId = async function (req, res) {

    const name = req.query.name;
    const phoneNumber = req.query.phoneNumber;
    const verifyCode = req.query.verifyCode;

    let getIdResult;

    if(!name)
        return res.send(response(baseResponse_j.USER_NAME_EMPTY));
    if(!phoneNumber)
        return res.send(response(baseResponse_j.USER_PHONE_NUMBER_EMPTY));
    if(!verifyCode)
        return res.send(response(baseResponse_j.VERIFY_CODE_EMPTY));
    
    const CacheData = Cache.get(phoneNumber);

    if (!CacheData) {
         return res.send(errResponse(baseResponse_j.FAIL_VERIFY));
    } else if (CacheData !== verifyCode) {
         return res.send(errResponse(baseResponse_j.VERIFY_NUMBER_NOT_MATCH));
    }
    else {
        Cache.del(phoneNumber);
        getIdResult = await userProvider.getId(name, phoneNumber);
        return res.send(response(baseResponse.SUCCESS, getIdResult));
    }

};

// 대출 결제
let tid;
let userId, item_name, quantity, price, cartId;

exports.loan = async function(req,res) {

    userId = req.verifiedToken.userId;        // jwt 토큰에서 받아오는 userId
    item_name = req.query.item_name;         // 상품명
    quantity = req.query.quantity;           // 상품 개수
    price = req.query.price;   // 상품 가격
    cartId = req.query.cartId;


    let headers = {
        'Authorization': 'KakaoAK '+'20e0754d1d30ba2ffea9ef112016b09c',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    };

    let params = {
        'cid': 'TC0ONETIME', // 테스트 코드
        'partner_order_id': '1',
        'partner_user_id': `${userId}`,
        'item_name': `${item_name}`,
        'quantity': quantity,
        'total_amount': price,
        'vat_amount': 0,
        'tax_free_amount': 0,
        'approval_url': 'https://dev.delibook.shop/loan/payment/approve',
        'fail_url': 'https://dev.delibook.shop/payment/fail',
        'cancel_url': 'https://dev.delibook.shop/payment/cancel',
    };

    let options = {
        url: 'https://kapi.kakao.com/v1/payment/ready',
        method: 'POST',
        headers: headers,
        form : params
    };

    let next_redirect_app_url;

    request(options, function result(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));      //JSON.parse : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
            next_redirect_app_url = (JSON.parse(body).next_redirect_mobile_url);
            tid = (JSON.parse(body).tid);
            return res.send(next_redirect_app_url) // redirect 하는 코드
        }
        else console.log("대출 결제준비 실패");
    });
}

//대출결제 승인요청
exports.loan_success = async function (req, res) {
    const pg_token = req.query.pg_token;
    let headers = {
        'Authorization': 'KakaoAK '+'20e0754d1d30ba2ffea9ef112016b09c',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }

    let params = {
        'cid' : 'TC0ONETIME',
        'tid' : `${tid}`,
        'partner_order_id':'1',
        'partner_user_id' : `${userId}`,
        'pg_token' : `${pg_token}`
    }

    let options = {
        url: 'https://kapi.kakao.com/v1/payment/approve',
        method: 'POST',
        headers: headers,
        form : params
    };
    console.log(pg_token, userId, tid, cartId, price)
    request(options, function result(error, response, body) {

        if (!error && response.statusCode === 200) {
            const insertBuyInfoResult = userService.insertBuyInfo(userId, cartId, price);
            return res.send("성공");
            //나중에 결제완료 창으로 redirect되도록 만들예정
        } else console.log("결제 승인 실패", error, response.statusCode)

    });
};


//반납결제
let loan_tid;
let loan_userId, loan_item_name, loan_quantity, loan_price, loan_cartId;
exports.return = async function(req,res) {

    loan_userId = req.verifiedToken.userId;        // jwt 토큰에서 받아오는 userId
    loan_item_name = req.query.item_name;         // 상품명
    loan_quantity = req.query.quantity;           // 상품 개수
    loan_price = req.query.price;   // 상품 가격
    loan_cartId = req.query.cartId;

    let headers = {
        'Authorization': 'KakaoAK '+'20e0754d1d30ba2ffea9ef112016b09c',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    };

    let params = {
        'cid': 'TC0ONETIME', // 테스트 코드
        'partner_order_id': '1',
        'partner_user_id': `${loan_userId}`,
        'item_name': `${loan_item_name}`,
        'quantity': loan_quantity,
        'total_amount': loan_price,
        'vat_amount': 0,
        'tax_free_amount': 0,
        'approval_url': 'http://localhost:3000/return/payment/approve',
        'fail_url': 'http://localhost:3000/payment/fail',
        'cancel_url': 'http://localhost:3000/payment/cancel',
    };

    let options = {
        url: 'https://kapi.kakao.com/v1/payment/ready',
        method: 'POST',
        headers: headers,
        form : params
    };

    let next_redirect_app_url;

    request(options, function result(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));      //JSON.parse : JSON 문자열의 구문을 분석하고, 그 결과에서 JavaScript 값이나 객체를 생성
            next_redirect_app_url = (JSON.parse(body).next_redirect_app_url);
            loan_tid = (JSON.parse(body).tid);
            return res.send(next_redirect_app_url) // redirect 하는 코드
        }
        else console.log("반납 결제준비 실패");
    });
}

// 반납결제 승인요청
exports.return_success = async function (req, res) {
    const pg_token = req.query.pg_token;
    let headers = {
        'Authorization': 'KakaoAK '+'20e0754d1d30ba2ffea9ef112016b09c',
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }

    let params = {
        'cid' : 'TC0ONETIME',
        'tid' : `${loan_tid}`,
        'partner_order_id':'1',
        'partner_user_id' : `${loan_userId}`,
        'pg_token' : `${pg_token}`
    }

    let options = {
        url: 'https://kapi.kakao.com/v1/payment/approve',
        method: 'POST',
        headers: headers,
        form : params
    };

    request(options, function result(error, response, body) {

        if (!error && response.statusCode === 200) {
            const updateBuyInfoResult = userService.updateBuyInfo(loan_cartId);
            return res.send("성공");
            //나중에 결제완료 창으로 redirect 되도록 만들예정
        } else console.log("결제 승인 실패")

    });
};