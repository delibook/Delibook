// userId로 내도서관 조회
async function getLibraryList(connection, userId) {
    const getLibraryListQuery = `
    select l.id, l.name
    from MyLibrary ml
           join Library l on l.id = ml.libraryId
    where ml.userId = ${userId}
    and ml.status = 0
    and l.status = 0;
  `
    const [getLibraryListRow] = await connection.query(getLibraryListQuery);
    return getLibraryListRow;
}

// 도서관 id로 도서관 조회
async function checkLibrary(connection, libraryId) {
  const checkLikeStatusQuery = `
      select l.id
      from Library l
      where l.id = ?
      and l.status = 0
`
  const [checkLikeStatusRow] = await connection.query(checkLikeStatusQuery, libraryId);
  return checkLikeStatusRow;
}


// 도서관 찜 상태 확인(userId, libraryId 이용)
async function checkLikeStatus(connection, userId, libraryId) {
  const checkLikeStatusQuery = `
      select ml.status
      from MyLibrary ml
      where ml.userId = ?
      and ml.libraryId = ?
`
  const [checkLikeStatusRow] = await connection.query(checkLikeStatusQuery, [userId, libraryId]);
  return checkLikeStatusRow;
}

// 도서관 찜정보 insert
async function insertLikeLibrary(connection, userId, libraryId) {
  const insertLikeLibraryQuery = `
      INSERT INTO MyLibrary(userId, libraryId)
      VALUES (?, ?);
`
  const [insertLikeLibraryRow] = await connection.query(insertLikeLibraryQuery, [userId, libraryId]);
  return insertLikeLibraryRow;
}

// 도서관 찜정보 update
async function updateLikeLibrary(connection, userId, libraryId, status) {
  const updateLikeLibraryQuery = `
      update MyLibrary
      set status = ?
      where userId = ?
      and libraryId = ?;
`
  const [updateLikeLibraryRow] = await connection.query(updateLikeLibraryQuery, [status, userId, libraryId]);
  return updateLikeLibraryRow;
}


module.exports = {
    getLibraryList,
    checkLikeStatus,
    insertLikeLibrary,
    updateLikeLibrary,
    checkLibrary
};