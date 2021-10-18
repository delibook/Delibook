module.exports = function(app){
    const etc= require('./etcController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 8. 내 도서관 조회 API
    app.get('/delibook/etc/notice', etc.getNotice);

};