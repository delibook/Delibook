module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 유저 생성 (회원가입) API
    app.post('/delibook/user/sign-up', user.postUsers);

    // 2. 마이페이지(책장) 조회 API(+ 책장별 조회)
    app.get('/delibook/user/my-page', jwtMiddleware, user.getMyPage);

    // 3. 로그인 API
    app.post('/delibook/user/login', user.login);
    
    // 4. 비밀번호 변경 API
    app.patch('/delibook/user/password-modify', jwtMiddleware, user.patchPassword);

    // 6. 탈퇴 API
    app.patch('/delibook/user/withdraw', user.withdraw);

    // 6. 이용내역 조회 API
    app.get('/delibook/user/usage', jwtMiddleware, user.getUsages);

    // 34. 휴대폰 인증 API
    app.post('/delibook/user/phone/auth', user.verifyPhoneNumber);

    // 35. 이메일 인증 API
    app.post('/delibook/user/email/auth', user.verifyEmail)

    // 37. 아이디 찾기 API
    app.post('/delibook/user/findId-form', user.findId)

    // 대출 결제 준비
    app.get('/delibook/loan', jwtMiddleware, user.return);

    // 대출 결제 승인 요청
    app.get('/payment/approve', user.success);
};
