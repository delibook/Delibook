module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 0. 테스트 API
    // app.get('/app/test', user.getTest)

    // 1. 유저 생성 (회원가입) API
    app.post('/delibook/users', user.postUsers);

    // 2. 마이페이지(책장) 조회 API(+ 책장별 조회)
    app.get('/delibook/user/my-page',user.getMyPage);

    // 3. 특정 유저 조회 API
    app.get('/app/users/:userId', user.getUserById);


    // TODO: After 로그인 인증 방법 (JWT)
    // 로그인 하기 API (JWT 생성)
    app.post('/delibook/login', user.login);

    // 6. 이용내역 조회 API
    app.get('/delibook/user/usage', user.getUsages);



};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API