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


module.exports = {
    getLibraryList
};