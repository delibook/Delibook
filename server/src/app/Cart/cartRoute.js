module.exports = function(app){
    const cart = require('./cartController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    //29. 책가방 조회 API
    app.get('/delibook/cart',jwtMiddleware,cart.getList);
    
    



};