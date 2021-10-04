module.exports = function(app){
    const address = require('./addressController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    app.patch('/delibook/address/:addressId',jwtMiddleware, address.patchAddress);




};