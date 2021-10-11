module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 유저 생성 (회원가입) API
    app.post('/delibook/user/sign-in', user.postUsers);

    // 2. 마이페이지(책장) 조회 API(+ 책장별 조회)
    app.get('/delibook/user/my-page',user.getMyPage);

    // 3. 로그인 API
    app.post('/delibook/user/login', user.login);

    // 4. 비밀번호 변경 API
    app.patch('/delibook/user/password-modify', user.patchPassword);

    // 6. 이용내역 조회 API
    app.get('/delibook/user/usage', user.getUsages);

    // 34. 휴대폰 인증 API
    app.post('/delibook/user/phone/auth', user.verifyPhoneNumber);

    // 35. 이메일 인증 API
    app.post('/delibook/user/email/auth', user.verifyEmail)

    // 37. 아이디 찾기 API
    app.post('/delibook/user/findId-form', user.findId)
};
