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

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE User
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
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
async function getUsagesList(connection, userId, condition) {
  const getUsagesListQuery = `
    select (case ui.status
              when 0 or 1 then date_format(ui.createdAt, '%Y-%m-%d')
              else date_format(ui.updatedAt, '%Y-%m-%d')
      end) as date,
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
    order by date DESC;
  `
  const [getUsagesListRow] = await connection.query(getUsagesListQuery, userId);
  return getUsagesListRow;
}

module.exports = {
  selectUser,
  selectUserEmail,
  insertUserInfo,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
  getCasesList,
  retrieveCaseList,
  getCaseList,
  getUsagesList
};
