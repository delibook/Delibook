module.exports = function(app){
    const cart = require('./cartController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //29. 책가방 조회 API
    app.get('/delibook/cart',jwtMiddleware,cart.getList);
    
    //30. 책가방에 책 넣기 API 
    app.post('/delibook/cart/insert',jwtMiddleware,cart.insertCart);
    
    //31.책가방 삭졔+ 특정 책 삭제 API
    app.patch('/delibook/cart/:cartId/drop',jwtMiddleware,cart.dropCart);
    //32. 책가방 책 수량 지정
    app.patch('/delibook/cart/:cartId/:bookId',jwtMiddleware,cart.editBookNum); 
    // 46. 카트에 담길 때 다른 도서관인지 체크
    app.get('/delibook/cart/check',jwtMiddleware,cart.canInsertCheck);


};