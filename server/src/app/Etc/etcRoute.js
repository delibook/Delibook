module.exports = function(app){
    const etc= require('./etcController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    //18.자주묻는 잘문 조회 API
    app.get('/delibook/etc/frequently-asked',etc.getAsked);
    // 30. 공지조회 API
    app.get('/delibook/etc/notice', etc.getNotice);

    // 31. 문의하기 API
    app.post('/delibook/etc/inquiry',etc.inquiry);

};