module.exports = function(app){
    const book = require('./bookController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 38.특정 책 정보  API
    app.get('/delibook/book/:bookId', book.getBook);
   
    // 39. 책목록 조회(메인에서 대여버튼 눌렀을 때) API
    app.get('/delibook/book', book.getBooks)

    // 42. 책 카테고리 조회 API
    app.get('/delibook/book/library/category', book.getCategories);

};
