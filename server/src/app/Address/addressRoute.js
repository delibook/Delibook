module.exports = function(app){
    const address = require('./addressController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/delibook/address/:addressId',jwtMiddleware, address.patchAddress);

    // 10. 내 주소 지정 API
    app.post('/delibook/address', address.postAddress);
};