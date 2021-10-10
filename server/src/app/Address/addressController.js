const jwtMiddleware = require("../../../config/jwtMiddleware");
const addressProvider = require("../../app/Address/addressProvider");
const addressService = require("../../app/Address/addressService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 10
 * API Name : 주소 수정 API
 * [GET] /delibook/address/:addressId
 */
 exports.patchAddress = async function (req, res) {

    /**
     * paramiter : addressId
     * body : address, detailAddress, latitude, longitude, mainAddress(can null)
     * header : x-access-token
     */
    const addressId= req.params.addressId;
    const userId= req.verifiedToken.userId;

    const {address, detailAddress, latitude, longitude, isMain} = req.body;
    

    if (!addressId) return res.send(errResponse(baseResponse.ADDRESS_ID_EMPTY)); //5100,주소 ID를 입력하세요.
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!address) return res.send(errResponse(baseResponse.ADDRESS_EMPTY)); //6001
    if(!detailAddress) return res.send(errResponse(baseResponse.ADDRESS_DETAIL_EMPTY)); //6002
    if(!latitude) return res.send(errResponse(baseResponse.ADDRESS_LATITUDE_EMPTY)); //6003
    if(!longitude) return res.send(errResponse(baseResponse.ADDRESS_LONGTITUDE_EMPTY)); //6005
    if(!isMain) return res.send(errResponse(baseResponse.ADDRESS_MAIN_EMPTY)); //6006



    const patchAddressResult = await addressService.ServicePatchAddress(userId, addressId,address, detailAddress, latitude, longitude,isMain);

    return res.send(response(baseResponse.SUCCESS, patchAddressResult));
};

/**
 * API No. 11
 * API Name : 내 주소 지정 API
 * [POST] /delibook/address
 */
exports.postAddress = async function (req, res) {

   const userId = req.query.userId;
   const {address, detailAddress, latitude, longitude} = req.body;

   if(!address)
      return res.send(response(baseResponse.ADDRESS_EMPTY))
   else if(!latitude)
      return res.send(response(baseResponse.ADDRESS_LATITUDE_EMPTY))
   else if(!longitude)
      return res.send(response(baseResponse.ADDRESS_LONGITUDE_EMPTY))

   const postAddressResult = await addressService.postAddress(userId, address, detailAddress, latitude, longitude);

   return res.send(postAddressResult);
};

/**
 * API No. 12
 * API Name : 내 주소 조회 API
 * [GET] /delibook/address
 */
exports.getAddress = async function(req, res) 
{

    /**
     * header : x-access-token
     */

    userId= req.verifiedToken.userId;
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    const getAddressResult = await addressProvider.getAddress(userId) ;
    return res.send(response(baseResponse.SUCCESS, getAddressResult));

};

/**
 * API No. 13
 * API Name : 특정 주소 삭제
 * [PATCH] /delibook/address/delete/:addressId
 */
 exports.deleteAddress = async function(req, res) 
 {
 
     /**
      * paramiter: addressId
      * header : x-access-token
      */
   
     addressId= req.params.addressId;
     userId= req.verifiedToken.userId;
     if (!userId) return res.send(errResponse(baseResponse.ADDRESS_ID_EMPTY)); 
     if (!addressId) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
 
     const deleteAddressResult = await addressService.deleteAddress(userId,addressId) ;
     return res.send(deleteAddressResult);
 
 };

/**
 * API No. 14
 * API Name : 대표주소 설정
 * [PATCH] /delibook/address/main/:addressId
 */
 exports.setMainAddress = async function(req, res) 
 {
 
     /**
      * paramiter: addressId
      * header : x-access-token
      */
   
     addressId= req.params.addressId;
     userId= req.verifiedToken.userId;
     if (!userId) return res.send(errResponse(baseResponse.ADDRESS_ID_EMPTY)); 
     if (!addressId) return res.send(errResponse(baseResponse.TOKEN_EMPTY));
 
     const setMainResult = await addressService.setMainAddress(userId,addressId) ;
     return res.send(setMainResult);
 
 };

 