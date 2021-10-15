// 특정 책 조회
async function getBookInfo(connection,bookId)
{
    const getBookInfoQuery = `
      select date_format(b.createdAt, '%Y-%m-%d') createdAt,
        b.imageURL, b.name, b.author, b.publisher, l.id libraryId, l.name libraryName, bc.name category, b.quantity
      from Book b
      join Library l on l.id = b.libraryId
      join BookCategory bc on bc.id = b.categoryId
      where b.status = 0
      and b.id = ?
    `;
    const [getBookInfoRow] = await connection.query(getBookInfoQuery, bookId);
    return getBookInfoRow;
}


// 전체 책 목록 조회
async function getBooksInfo(connection,condition)
{
    const getBooksInfoQuery = `
      select b.id, b.imageURL, b.name, b.author, b.publisher, l.id libraryId, l.name libraryName
      from Book b
      join Library l on l.id = b.libraryId
      join BookCategory bc on bc.id = b.categoryId
      where b.status = 0
      `+condition+`
    `;
    const [getBooksInfoRow] = await connection.query(getBooksInfoQuery);
    return getBooksInfoRow;
}

// 책 카테고리 조회
async function getCategoriesList(connection, condition)
{
    const getCategoriesListQuery = `
      select bc.id categoryId, bc.name
      from Book b
      join BookCategory bc on bc.id = b.categoryId
      join Library l on l.id = b.libraryId
      where bc.status = 0
      `+condition+`
      group by bc.id
    `;
    const [getCategoriesListRow] = await connection.query(getCategoriesListQuery);
    return getCategoriesListRow;
}
  
  
  module.exports = {
    getBookInfo,
    getBooksInfo,
    getCategoriesList
  };
  