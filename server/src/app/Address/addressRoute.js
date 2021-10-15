module.exports = function(app){
    const address = require('./addressController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 10.내 주소 수정 API
    app.patch('/delibook/address/edit/:addressId',jwtMiddleware, address.patchAddress);

    // 11. 내 주소 생성 API
    app.post('/delibook/address', address.postAddress);

    // 12. 내 주소 조회 APi
    app.get('/delibook/address',jwtMiddleware,address.getAddress);

    //13. 특정 주소 삭제API
    app.patch('/delibook/address/delete/:addressId',jwtMiddleware,address.deleteAddress);

    //14. 대표주소 설정API
    app.patch('/delibook/address/main/:addressId',jwtMiddleware,address.setMainAddress);
};