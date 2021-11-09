module.exports = {

    // Success
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // Common
    TOKEN_EMPTY : { "isSuccess": false, "code": 2000, "message":"JWT 토큰을 입력해주세요." },
    TOKEN_VERIFICATION_FAILURE : { "isSuccess": false, "code": 3000, "message":"JWT 토큰 검증 실패" },
    TOKEN_VERIFICATION_SUCCESS : { "isSuccess": true, "code": 1001, "message":"JWT 토큰 검증 성공" }, // ?

    //Request error
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요" },
    SIGNUP_EMAIL_LENGTH : { "isSuccess": false, "code": 2002, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNUP_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2003, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2004, "message": "비밀번호를 입력 해주세요." },
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 7~15자리를 입력해주세요." },
    SIGNUP_NAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },
    SIGNUP_PHONE_EMPTY : {"isSuccess": false,"code": 2008,"message":"닉네임은 최대 20자리를 입력해주세요." },
    SIGNUP_PHONE_LENGTH : {"isSuccess": false,"code": 2009,"message":"닉네임은 최대 20자리를 입력해주세요."},
    
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2010, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2011, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2012, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2013, "message": "비밀번호를 입력 해주세요." },
/// 
    USER_USERID_EMPTY : { "isSuccess": false, "code": 2012, "message": "userId를 입력해주세요." },
    USER_USERID_NOT_EXIST : { "isSuccess": false, "code": 2013, "message": "해당 회원이 존재하지 않습니다." },

    USER_USEREMAIL_EMPTY : { "isSuccess": false, "code": 2014, "message": "이메일을 입력해주세요." },
    USER_USEREMAIL_NOT_EXIST : { "isSuccess": false, "code": 2015, "message": "해당 이메일을 가진 회원이 존재하지 않습니다." },
    USER_ID_NOT_MATCH : { "isSuccess": false, "code": 2016, "message": "유저 아이디 값을 확인해주세요" },
    USER_NICKNAME_EMPTY : { "isSuccess": false, "code": 2017, "message": "변경할 닉네임 값을 입력해주세요" },

    USER_STATUS_EMPTY : { "isSuccess": false, "code": 2018, "message": "회원 상태값을 입력해주세요" },
    ADDRESS_EMPTY : { "isSuccess": false, "code": 2019, "message": "도로명 또는 지번 주소를 입력해주세요." },
    LATITUDE_EMPTY : { "isSuccess": false, "code": 2020, "message": "위도를 입력해주세요." },
    LONGITUDE_EMPTY : { "isSuccess": false, "code": 2021, "message": "경도를 입력해주세요." },


    // Response error
    SIGNUP_REDUNDANT_EMAIL : { "isSuccess": false, "code": 3001, "message":"중복된 이메일입니다." },
    SIGNUP_REDUNDANT_NICKNAME : { "isSuccess": false, "code": 3002, "message":"중복된 닉네임입니다." },

    SIGNIN_EMAIL_WRONG : { "isSuccess": false, "code": 3003, "message": "아이디가 잘못 되었습니다." },
    SIGNIN_PASSWORD_WRONG : { "isSuccess": false, "code": 3004, "message": "비밀번호가 잘못 되었습니다." },
    SIGNIN_INACTIVE_ACCOUNT : { "isSuccess": false, "code": 3005, "message": "비활성화 된 계정입니다. 고객센터에 문의해주세요." },
    SIGNIN_WITHDRAWAL_ACCOUNT : { "isSuccess": false, "code": 3006, "message": "탈퇴 된 계정입니다. 고객센터에 문의해주세요." },

    USERID_CASE_NOT_MATCH : { "isSuccess": false, "code": 3007, "message": "해당 유저의 책장이 아닙니다." },
    CASE_NOT_EXIST : { "isSuccess": false, "code": 3008, "message": "해당하는 책장이 없습니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},


    BOOK_ID_EMPTY :  { "isSuccess": false, "code": 4901, "message": "책 Id 입력하세요." },


    BOOKCASE_NAME_EMPTY : { "isSuccess": false, "code": 5000, "message": "책장명을 입력하세요." },
    BOOKCASE_NAME_NOT_MATCH : { "isSuccess": false, "code": 5001, "message": "책장명이 다릅니다." },
    BOOCASE_ID_EMPTY : {"isSuccess": false, "code": 5002, "message": "책장Id를 입력하세요." },
    BOOKCASE_ACTION_TYPE_EMPTY : {"isSuccess": false, "code": 5003, "message": "type을 입력하세요. (insert or drop)" },
    BOOKCASE_NOT_MATCH: {"isSuccess": false, "code": 5004, "message": "해당유저의 책장이 아닙니다. 책장Id를 확인하세요" },
    BOOKCASE_BOOK_ALREADY_EXISTS :{"isSuccess": false, "code": 5005, "message": "이미 찜해짐" },
    BOOKCASE_BOOK_NOT_EXISTS:{"isSuccess": false, "code": 5006, "message": "찜 취소할 책이 없음, 책 아이디 확인해" },
    BOOKCASE_NAME_REDUNDANT:{"isSuccess": false, "code": 5007, "message": "동일한 책장이 존재합니다. 이름을 다시 설정하세요." },

    ADDRESS_ID_EMPTY :  { "isSuccess": false, "code": 5100, "message": "주소 ID를 입력하세요." },
    ADDRESS_EMPTY :  { "isSuccess": false, "code": 5101, "message": "주소를  입력하세요." },
    ADDRESS_DETAIL_EMPTY:  { "isSuccess": false, "code": 5102, "message": "상세주소를 입력하세요." },
    ADDRESS_LATITUDE_EMPTY :  { "isSuccess": false, "code": 5103, "message": "위도를 입력하세요." },
    ADDRESS_LONGTITUDE_EMPTY  :  { "isSuccess": false, "code": 5104, "message": "경도를 입력하세요." },
    ADDRESS_MAIN_EMPTY:  { "isSuccess": false, "code": 5105, "message": "메인주소 여부를 입력하세요." },
    ADDRESS_USER_NOT_MATCH:  { "isSuccess": false, "code": 5106, "message": "주소아이디와 유저아이디가 맞지 않습니다. 확인해주세요" },
    ADDRESS_DELETE_SUCCESS:  { "isSuccess": false, "code": 5107, "message": "주소삭제 성공" },
    ADDRESS_ALREADY_DELETED :  { "isSuccess": false, "code": 5108, "message": "이미삭제된 주소입니다." },

    CART_ID_EMPTY :  { "isSuccess": false, "code": 5200, "message": "카트아이디 입력필요." },
    CART_ACTION_TYPE_EMPTY : {"isSuccess": false, "code": 5201, "message": "type을 입력하세요. (plus or minus)" },
    CART_NOT_MATCH : {"isSuccess": false, "code": 5202, "message": "해당유저의 카트에 들어있는 책이 아닙니다.  카트id와 책 id를 확인해주세요" },
    CART_LIBRARY_ID_EMPTY: {"isSuccess": false, "code": 5203, "message": "카트에 들어갈 도서관 아이디를 입력하세요. " },
    CART_BOOK_LIBRARY_NOT_EXISTS : {"isSuccess": false, "code": 5204, "message": "해당 도서관에 해당 책이 존재하지 않습니다. 도서관 아이디와 책 아이디를 확인해주세요. "},
    CART_USER_NOT_MATCH: {"isSuccess": false, "code": 5205, "message": "해당 유저의 카트가 아닙니다. 카트아이디를 확인해주세요."},

    TITLE_EMPTY : {"isSuccess": false, "code": 5300, "message": "제목을 입력하세요."},
    CONTENT_EMPTY : {"isSuccess": false, "code": 5301, "message": "내용을 입력하세요."},
}
