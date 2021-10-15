module.exports = function(app){
    const library = require('./libraryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 8. 내 도서관 조회 API
    app.get('/delibook/library/my-library', library.getMyLibrary);

    // 24. 도서관 찜하기/빼기 버튼 API
    app.post('/delibook/library/:libraryId/like', library.likeLibrary);

    // 25. 도서관별 책 조회 API (+카테고리 선택)
    app.get('/delibook/library/:libraryId/book', library.getLibraryBook);

    // 27. 전체 도서관 조회 API + 거리별 필터
    app.get('/delibook/library', library.getLibrary);

    // 28. 특정 도서관 편의정보 조회 API
    app.get('/delibook/library/:libraryId', library.getLibraryDetail);
};