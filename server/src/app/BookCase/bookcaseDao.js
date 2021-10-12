
// 내 책장의 책 목록 조회
async function selectBookListInBookCase(connection,userId,bookcaseName)
{
    const bookListQuery = `
        select myBookList.name as BookListName,l.name as libraryName, c.name as category , book.name as bookTitle,
        book.status as bookStatus, book.imageURL thumbnail , l.tip as loanTip
        
        from BookInList as bookInList join  Book  as book on bookInList.bookId = book.id
        join MyBookList as myBookList on  myBookList.id = bookInList.listId
        join User as user on user.id= myBookList.userId
        join Library as l  on l.id= book.libraryId
        join BookCategory as c on c.id=book.categoryId
    
        where userId= ? AND myBookList.name like ?
`;
    const bookListRow = await connection.query(bookListQuery,[userId,bookcaseName]);
    return bookListRow[0];
}

  
  
  module.exports = {
    selectBookListInBookCase,
  };
  