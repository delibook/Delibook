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
    SIGNUP_PASSWORD_LENGTH : { "isSuccess": false, "code": 2005, "message":"비밀번호는 6~20자리를 입력해주세요." },
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2006, "message":"닉네임을 입력 해주세요." },
    SIGNUP_NICKNAME_LENGTH : { "isSuccess": false,"code": 2007,"message":"닉네임은 최대 20자리를 입력해주세요." },

    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2008, "message":"이메일을 입력해주세요" },
    SIGNIN_EMAIL_LENGTH : { "isSuccess": false, "code": 2009, "message":"이메일은 30자리 미만으로 입력해주세요." },
    SIGNIN_EMAIL_ERROR_TYPE : { "isSuccess": false, "code": 2010, "message":"이메일을 형식을 정확하게 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2011, "message": "비밀번호를 입력 해주세요." },

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

    USER_PASSWORD_EMPTY : { "isSuccess": false, "code": 6001, "message": "기존 비밀번호를 입력해주세요." },
    MODIFY_PASSWORD_EMPTY : { "isSuccess": false, "code": 6002, "message": "바꿀 비밀번호를 입력해주세요." },
    CHECK_PASSWORD_EMPTY : { "isSuccess": false, "code": 6003, "message": "바꿀 비밀번호를 한번 더 입력해주세요." },
    CHECK_PASSWORD_NOT_MATCH : { "isSuccess": false, "code": 6004, "message": "입력한 비밀번호가 다릅니다." },
    PASSWORD_NOT_MATCH : { "isSuccess": false, "code": 6005, "message": "기존 비밀번호가 일치하지 않습니다." },
    MODIFY_PASSWORD_EQUAL : { "isSuccess": false, "code": 6006, "message": "기존 비밀번호와 같은 비밀번호로 변경할 수 없습니다." },

    LIBRARYID_NOT_EXIST : { "isSuccess": false, "code": 6007, "message": "존재하지 않는 도서관입니다." },
    BOOKID_NOT_EXIST : { "isSuccess": false, "code": 6008, "message": "존재하지 않는 책입니다." },

    PHONE_NUMBER_EMPTY : { "isSuccess": false, "code": 6009, "message": "핸드폰 번호를 입력해주세요." },
    PHONE_NUMBER_ERROR_TYPE : { "isSuccess": false, "code": 6010, "message": "핸드폰 번호를 제대로 입력해주세요." },
    SMS_SEND_ERROR : { "isSuccess": false, "code": 6011, "message": "메세지를 보내는 데 실패했습니다." },
    EMAIL_SEND_ERROR : { "isSuccess": false, "code": 6012, "message": "이메일을 보내는 데 실패했습니다." },

    USER_NAME_EMPTY : { "isSuccess": false, "code": 6013, "message": "이름을 입력해주세요." },
    USER_PHONE_NUMBER_EMPTY : { "isSuccess": false, "code": 6014, "message": "휴대폰번호를 입력해주세요." },
    VERIFY_CODE_EMPTY : { "isSuccess": false, "code": 6015, "message": "인증 코드를 입력해주세요." },
    FAIL_VERIFY : { "isSuccess": false, "code": 6016, "message": "인증에 실패했습니다." },
    VERIFY_NUMBER_NOT_MATCH : { "isSuccess": false, "code": 6017, "message": "인증코드가 다릅니다." },
    USER_PHONE_NOT_MATCH : { "isSuccess": false, "code": 6018, "message": "정보가 일치하는 유저가 없습니다." },

    //Connection, Transaction 등의 서버 오류
    DB_ERROR : { "isSuccess": false, "code": 4000, "message": "데이터 베이스 에러"},
    SERVER_ERROR : { "isSuccess": false, "code": 4001, "message": "서버 에러"},
 
 
}
