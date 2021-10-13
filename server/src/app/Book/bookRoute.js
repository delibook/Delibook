module.exports = function(app){
    const book = require('./bookController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 42.특정 책 정보  API
    app.get('/delibook/book/:bookId', book.getBook);
   
    // 43. 책목록 조회(메인에서 대여버튼 눌렀을 때) API
    app.get('/delibook/book', book.getBooks)

};
