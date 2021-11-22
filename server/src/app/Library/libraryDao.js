// userId로 내도서관 조회
async function getMyLibraryList(connection, userId) {
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

// 도서관별 책목록 조회
async function getLibraryBookList(connection, libraryId, condition) {
  const getLibraryBookListQuery = `
      select b.id, b.imageURL, b.name, b.author, b.publisher, b.quantity
      from Book b
      join Library l on l.id = b.libraryId
      join BookCategory bc on bc.id = b.categoryId
      where b.status = 0
      and l.id = ${libraryId}
      `+condition+`
`
  const [getLibraryBookListRow] = await connection.query(getLibraryBookListQuery);
  return getLibraryBookListRow;
}

// 도서관 목록 조회(+거리 필터)
async function getLibraryList(connection, userId, condition) {
  const getLibraryListQuery = `
  select l.id, l.name, l.cityName, l.sigunguName, l.closeDay, l.type,
  l.tip + (round((6371 * acos( cos( radians(a.latitude) ) * cos( radians(l.latitude) ) * cos( radians(a.longitude) - radians(l.longitude) ) + sin( radians(a.latitude) ) * sin( radians(l.latitude)))),0) * l.plusTip) as tip,
  round((6371 * acos( cos( radians(a.latitude) ) * cos( radians(l.latitude) ) * cos( radians(a.longitude) - radians(l.longitude) ) + sin( radians(a.latitude) ) * sin( radians(l.latitude)))),2) as distance
      from Library l, User u
      join Address a on a.userId = u.id
      where a.status = 0
      and a.isMain = 1
      and l.status = 0
      and u.id = ${userId}
      `+condition+`
      order by distance;
`
  const [getLibraryListRow] = await connection.query(getLibraryListQuery);
  return getLibraryListRow;
}

// 도서관 편의정보 조회
async function getLibraryDetailList(connection, libraryId) {
  const getLibraryDetailListQuery = `
      select l.name, l.cityName, l.sigunguName, l.closeDay, l.type,
      concat(date_format(l.weekOpen, '%H:%i'), ' ~ ', date_format(l.weekClose, '%H:%i')) weekTime,
      concat(date_format(l.satOpen, '%H:%i'), ' ~ ', date_format(l.satClose, '%H:%i')) satTime,
      concat(date_format(l.holidayOpen, '%H:%i'), ' ~ ', date_format(l.holidayClose, '%H:%i')) holidayTime,
      l.phoneNumber, l.site, l.roadAddress,l.latitude, l.longitude
      from Library l
      where l.id = ${libraryId};
`
  const [getLibraryDetailListRow] = await connection.query(getLibraryDetailListQuery);
  return getLibraryDetailListRow;
}


module.exports = {
    getMyLibraryList,
    checkLikeStatus,
    insertLikeLibrary,
    updateLikeLibrary,
    checkLibrary,
    getLibraryBookList,
    getLibraryList,
    getLibraryDetailList
};