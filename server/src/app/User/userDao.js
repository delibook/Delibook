// 모든 유저 조회
async function selectUser(connection) {
  const selectUserListQuery = `
                SELECT email, name 
                FROM User;
                `;
  const [userRows] = await connection.query(selectUserListQuery);
  return userRows;
}

// 이메일로 회원 조회
async function selectUserEmail(connection, email) {
  const selectUserEmailQuery = `
                SELECT email, name 
                FROM User
                WHERE email = ?;
                `;
  const [emailRows] = await connection.query(selectUserEmailQuery, email);
  return emailRows;
}


// 유저 생성
async function insertUserInfo(connection, insertUserInfoParams) {
  const insertUserInfoQuery = `
        INSERT INTO User(email, password, name, phoneNumber)
        VALUES (?, ?, ?,?);
    `;
  const insertUserInfoRow = await connection.query(insertUserInfoQuery,
    insertUserInfoParams);

  return insertUserInfoRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, name, password
        FROM User
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 패스워드 체크
async function selectUserPasswordForWithdraw(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT id, name, password
        FROM User
        WHERE id = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id,email
        FROM User
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

// 유저 책장 조회
async function getCasesList(connection, userId) {
  const getCasesListQuery = `
      select mbl.name
      from MyBookList mbl
      where mbl.userId = ${userId}
      and mbl.status = 0
    `;
  const [getCasesListRow] = await connection.query(getCasesListQuery);
  return getCasesListRow;
}

// 책장 id로 조회
async function retrieveCaseList(connection, caseId) {
  const retrieveCaseListQuery = `
    select mbl.id, mbl.userId
    from MyBookList mbl
    where mbl.id = ${caseId}
    and mbl.status = 0;
  `
  const [retrieveCaseListRow] = await connection.query(retrieveCaseListQuery);
  return retrieveCaseListRow;
}

// 특정 책장 조회
async function getCaseList(connection, caseId) {
  const getCaseListQuery = `
      select mbl.name, b.id, b.name
      from BookInList bil
      join Book b on b.id = bil.bookId
      join MyBookList mbl on mbl.id = bil.listId
      where mbl.id = ${caseId}
      and mbl.status = 0
      and b.status = 0
      and bil.status = 0;
   `;
  const [getCaseListRow] = await connection.query(getCaseListQuery);
  return getCaseListRow;
}

// 책장 id로 조회
async function getUsagesList(connection, userId, condition,loan_condition) {
  const getUsagesListQuery = `
    select ui.cartId,
           (case ui.status
              when 0 or 1 then date_format(ui.createdAt, '%Y-%m-%d')
              else date_format(ui.updatedAt, '%Y-%m-%d')
      end) as loanDate,
           `+loan_condition+`
       (case ui.status
        when 0 then '대여배달중'
        when 1 then '대여중'
        when 2 then '주문취소'
        when 3 then '반납중'
        when 4 then '반납완료'
        end) as status,
       l.id libraryId, l.name libraryName,
        (case ui.status
        when 0 or 1 then concat(date_format(ui.createdAt, '%Y-%m-%d'), ' ~ ', date_format(ui.toReturnDate, '%Y-%m-%d'))
        when 3 or 4 then concat(date_format(ui.createdAt, '%Y-%m-%d'), ' ~ ', date_format(ui.updatedAt, '%Y-%m-%d'))
        else ''
        end) as period,
       (case x.bookCount
            when 1 then x.name
            else concat(x.name, ' 외 ', x.bookCount-1, '권')
           end
           )as book
    from UsageInformation ui
      join Cart c on c.id = ui.cartId
      join Library l on l.id = c.libraryId
      join (
      select count(b.id) bookCount, b.name, ui.id
      from Book b
      join BookInCart bic on bic.bookId = b.id
      join Cart c on c.id = bic.cartId
      join UsageInformation ui on ui.cartId = c.id
      group by ui.id
      ) x on ui.id = x.id
    where not ui.status = 5
      and ui.userId = ?
    `+condition+`
    order by loanDate DESC;
  `
  const [getUsagesListRow] = await connection.query(getUsagesListQuery, userId);
  return getUsagesListRow;
}

// 특정 유저 비밀번호 체크
async function checkUserPassword(connection, userId) {
  const checkUserPasswordQuery = `
    select u.password
    from User u
    where u.id = ?
  `
  const [checkUserPasswordRow] = await connection.query(checkUserPasswordQuery, userId);
  return checkUserPasswordRow;
}

// 특정 유저 비밀번호 체크
async function patchPasswordInfo(connection, userId, hashedModifyPassword) {
  const patchPasswordInfoQuery = `
    update User
    set password = ?
    where id = ?;
  `
  const [patchPasswordInfoRow] = await connection.query(patchPasswordInfoQuery, [hashedModifyPassword, userId]);
  return patchPasswordInfoRow;
}

// 유저 이름, 휴대전화 체크
async function checkUserInfo(connection, name, phoneNumber) {
  const checkUserInfoQuery = `
    select u.email
    from User u
    where u.status = 0
    and u.name = ?
    and u.phoneNumber = ?
  `
  const [checkUserInfoRow] = await connection.query(checkUserInfoQuery, [name, phoneNumber]);
  return checkUserInfoRow;
}
//탈퇴
async function withdrawUser(connection, userId) {
  const withdrawUserQuery = `
    update User set status=1 where id=?
  `
  const [withdrawUserRow] = await connection.query(withdrawUserQuery, userId);
  return withdrawUserRow;
}

// 대출 정보 삽입
async function insertLoanInfo(connection, userId, cartId, price) {
  const insertLoanInfoQuery = `
    INSERT INTO UsageInformation
      (userId, cartId, price, status, toReturnDate)
    VALUES
      (?, ?, ?, 1, date_add(now(),interval 7 Day));
  `
  const [insertLoanInfoRow] = await connection.query(insertLoanInfoQuery, [userId, cartId, price]);
  return insertLoanInfoRow;
}

//주문 책 수량 조회
async function getBookAmount(connection, cartId) {
  const getBookAmountQuery = `
    select bookId, quantity
    from BookInCart bic
    where status = 0
      and bic.cartId = ?
  `
  const [getBookAmountRow] = await connection.query(getBookAmountQuery, cartId);
  return getBookAmountRow;
}

//수량만큼 재고에서 차감
async function updateBookAmount(connection, bookId, quantity) {
  const updateBookAmountQuery = `
    update Book
    set quantity = quantity - ?
    where id = ?;
  `
  const [updateBookAmountRow] = await connection.query(updateBookAmountQuery, [quantity, bookId]);
  return updateBookAmountRow;
}

//cart status 주문완료로 바꾸기
async function updateCart(connection, cartId) {
  const updateCartQuery = `
    update Cart
    set status = 1
    where id = ?;
  `
  const [updateCartRow] = await connection.query(updateCartQuery, cartId);
  return updateCartRow;
}

// 내역 status 반납으로 바꾸기
async function patchReturnInfo(connection, cartId) {
  const patchReturnInfoQuery = `
    update UsageInformation
    set status = 4
    where cartId = ?;
  `
  const [patchReturnInfoRow] = await connection.query(patchReturnInfoQuery, cartId);
  return patchReturnInfoRow;
}

//수량만큼 재고에서 더하기
async function updateBookAmountPlus(connection, bookId, quantity) {
  const updateBookAmountPlusQuery = `
    update Book
    set quantity = quantity + ?
    where id = ?;
  `
  const [updateBookAmountPlusRow] = await connection.query(updateBookAmountPlusQuery, [quantity, bookId]);
  return updateBookAmountPlusRow;
}

module.exports = {
  selectUser,
  selectUserEmail,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  getCasesList,
  retrieveCaseList,
  getCaseList,
  getUsagesList,
  checkUserPassword,
  patchPasswordInfo,
  checkUserInfo,
  selectUserPasswordForWithdraw,
  withdrawUser,
  insertLoanInfo,
  getBookAmount,
  updateBookAmount,
  updateCart,
  patchReturnInfo,
  updateBookAmountPlus
};
