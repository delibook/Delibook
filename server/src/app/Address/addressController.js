const jwtMiddleware = require("../../../config/jwtMiddleware");
const addressProvider = require("../../app/Address/addressProvider");
const addressService = require("../../app/Address/addressService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");


/**
 * API No. 7
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
    

    if (!addressId) return res.send(errResponse(baseResponse.ADDRESS_ID_EMPTY)); //6000, 수정할 주소의 id를 입력하세요.
    if (!userId) return res.send(errResponse(baseResponse.TOKEN_EMPTY));

    if(!address) return res.send(errResponse(baseResponse.ADDRESS_EMPTY)); //6001
    if(!detailAddress) return res.send(errResponse(baseResponse.ADDRESS_DETAIL_EMPTY)); //6002
    if(!latitude) return res.send(errResponse(baseResponse.ADDRESS_LATITUDE_EMPTY)); //6003
    if(!longitude) return res.send(errResponse(baseResponse.ADDRESS_LONGTITUDE_EMPTY)); //6005
    if(!isMain) return res.send(errResponse(baseResponse.ADDRESS_MAIN_EMPTY)); //6006



    const patchAddressResult = await addressService.ServicePatchAddress(userId, addressId,address, detailAddress, latitude, longitude,isMain);

    return res.send(response(baseResponse.SUCCESS, patchAddressResult));
};
