// 특정 책 조회
async function getBookInfo(connection,bookId)
{
    const getBookInfoQuery = `
      select date_format(b.createdAt, '%Y-%m-%d') createdAt,
        b.imageURL, b.name, b.author, b.publisher, l.id libraryId, l.name, bc.name category, b.quantity
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
async function getBooksInfo(connection,category)
{
    const getBooksInfoQuery = `
    select b.id, b.imageURL, b.name, b.author, b.publisher, l.id libraryId, l.name
    from Book b
    join Library l on l.id = b.libraryId
    join BookCategory bc on bc.id = b.categoryId
    where b.status = 0
    `+condition+`
`;
    const [getBooksInfoRow] = await connection.query(getBooksInfoQuery);
    return getBooksInfoRow;
}

  
  
  module.exports = {
    getBookInfo,
    getBooksInfo
  };
  