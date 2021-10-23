module.exports = function(app){
    const etc= require('./etcController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 30. 공지조회 API
    app.get('/delibook/etc/notice', etc.getNotice);

    // 31. 문의하기 API
    app.post('/delibook/etc/inquiry',etc.inquiry);

};