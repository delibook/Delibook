const jwtMiddleware = require("../../../config/jwtMiddleware");
const cartProvider = require("./cartProvider");
const cartService = require("./cartService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");
const { query } = require("winston");


/**
 * API No. 29
 * API Name :  책가방조회
 * [GET] /delibook/cart
 */
 exports.getList = async function (req, res) {

    /**
     * header :  x-access--token
     */
    
    const userId= req.verifiedToken.userId;
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;

    const getCartResult = await cartProvider.getCart(userId);
    return res.send(response(baseResponse.SUCCESS, getCartResult));
};