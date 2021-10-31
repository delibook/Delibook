module.exports = function(app){
    const bookcase = require('./bookcaseController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //7.특정 책장 속 책 조회
    app.get('/delibook/bookcase/books',jwtMiddleware,bookcase.getBookList);
    
    //23. 마이책장에 책 넣기/빼기 
    app.post('/delibook/bookcase/:bookcaseId/:bookId/like',jwtMiddleware,bookcase.insertBook);

    // 43.책장생성
    app.post('/delibook/bookcase/add',bookcase.addBookcase);
    //44.책장 삭제
    app.patch('/delibook/bookcase/delete',bookcase.deleteBookcase);


};
