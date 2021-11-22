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
/**
 * API No. 30
 * API Name :  책가방 삽입
 * [GET] /delibook/cart/insert-cart
 */
 exports.insertCart = async function (req, res) {

    /**
     * header :  x-access--token
     * query string : bookId, libraryId
     */
    
    const userId= req.verifiedToken.userId; 
    const bookId= req.query.bookId; 
    const libraryId= req.query.libraryId;
   

    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;
    
    if(!bookId)  return res.send(errResponse(baseResponse.BOOK_ID_EMPTY)) ; //4901 
    if(!libraryId)  return res.send(errResponse(baseResponse.CART_LIBRARY_ID_EMPTY)) ; //5203

    // 삽입하려는 책의 id나 도서관id가 존재하지 않을 경우 

    const insertCartResult = await cartService.insertCart(userId,bookId,libraryId); 
    return res.send( insertCartResult);
};
/**
 * API No. 32
 * API Name :  책가방 속 책 수량 수정
 * [GET] /delibook/cart/:cartId/:bookId
 */
 exports.editBookNum = async function (req, res) {

    /**
     * header :  x-access--token
     * pathVariable : cartId,bookId 
     * query string : type  
     */
    
    const userId= req.verifiedToken.userId;
    const cartId = req.params.cartId;
    const bookId= req.params.bookId; 
    const type=req.query.type; 

    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;
    if(!cartId)  return res.send(errResponse(baseResponse.CART_ID_EMPTY)) ; //5200
    if(!bookId)  return res.send(errResponse(baseResponse.BOOK_ID_EMPTY)) ; //4901 
    if(!type)  return res.send(errResponse(baseResponse.CART_ACTION_TYPE_EMPTY)) ; //5201 

    /// 해당 유저의 카트가 맞는지, 카트안에 들어있는 책이 맞는지

    const getCartResult = await cartService.editCartBookNum(userId,cartId,bookId,type); 
    return res.send( getCartResult);
};

/**
 * API No. 31
 * API Name :  책가방 삭제+ 책가방 속 특정 책 삭제 
 * [PATCH] /delibook/cart/:cartId/:bookId
 */
 exports.dropCart = async function (req, res) {

    /**
     * header :  x-access--token
     * query string : cartId, ]bookId 
     */
    
    const userId= req.verifiedToken.userId;
    const cartId = req.params.cartId;
    const bookId= req.query.bookId; 

    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;
    if(!cartId)  return res.send(errResponse(baseResponse.CART_ID_EMPTY)) ; //5200
    if (!bookId) {
        //해당 유저의 카트가 맞는지 
        const dropCartResult = await cartService.dropCart(userId,cartId);
        return res.send( dropCartResult);
    }
    else {
        /// 해당 유저의  카트안에 들어있는 책이 맞는지
        const dropCartBookResult = await cartService.dropCartBook(userId,cartId,bookId); 
        return res.send( dropCartBookResult);
    }
    
};


/**
 * API No. 46
 * API Name :  다른 도서관 인지체크
 * [GET] /delibook/cart/check
 */
 exports.canInsertCheck = async function (req, res) {

    /**
     * header :  x-access--token
     */
    
    const userId= req.verifiedToken.userId;
    //const bookId= req.query.bookId; 
    const libraryId= req.query.libraryId;

    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY)) ;
   // if(!bookId)  return res.send(errResponse(baseResponse.BOOK_ID_EMPTY)) ; //4901 
    if(!libraryId)  return res.send(errResponse(baseResponse.CART_LIBRARY_ID_EMPTY)) ; //5203

    const checkResult = await cartProvider.canInsertCheck(userId,libraryId);
    
    return res.send(response(baseResponse.SUCCESS, checkResult));
};

/**
 * API No. 47
 * API Name :  카트아이디로 특정 카트 조회
 * [GET] /delibook/cart/check
 */
 exports.oneCart = async function (req, res) {

    
    const cartId= req.params.cartId

    if (!cartId) return res.send(errResponse(baseResponse.CART_ID_EMPTY)) ;

    const getCartResult= await cartProvider.getOneCart(cartId);
    
    return res.send(response(baseResponse.SUCCESS, getCartResult));
};