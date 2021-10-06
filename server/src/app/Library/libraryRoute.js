module.exports = function(app){
    const library = require('./libraryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 8. 내 도서관 조회 API
    app.get('/delibook/library/my-library', library.getMyLibrary);

    //24. 도서관 찜하기/빼기 버튼 API
    app.post('/delibook/library/:libraryId/like', library.likeLibrary);

};