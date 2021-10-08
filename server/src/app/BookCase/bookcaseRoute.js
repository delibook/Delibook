module.exports = function(app){
    const bookcase = require('./bookcaseController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //7.특정 책장 속 책 조회
    app.get('/delibook/bookcase/books',jwtMiddleware,bookcase.getBookList);
   



};
