
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

// 내 책장 목록 조회
async function bookcaseList(connection,userId)
{
    const bookcaseListQuery = `
    select id as myBookCaseId, name as myBookCaseName
    from MyBookList
    where userId=? and status=0;
`;
    const bookcaseListRow = await connection.query(bookcaseListQuery,[userId]);
    return bookcaseListRow[0];
};


// 책장이 존재하는지 체크 
async function checkBookCase(connection,userId,bookcaseId)
{
    const bookListQuery = `
    select bl.id as bookcaseId from MyBookList as bl join User on User.id= bl.userId where User.id=? AND bl.id=?;
`;
    const bookListRow = await connection.query(bookListQuery,[userId,bookcaseId]);
    return bookListRow[0];
}

// 책장명 존재하는지 체크 
async function checkBookCaseName(connection,userId,title)
{
    const bookListQuery = `
    select bl.id as bookcaseId from MyBookList as bl join User on User.id= bl.userId where User.id=? AND bl.name like concat ("%",?,"%");
`;
    const bookListRow = await connection.query(bookListQuery,[userId,title]);
    return bookListRow[0];
}

// 책장에 책 삽입
async function Like(connection,bookcaseId,bookId)
{
    const bookLikeQuery = `
    insert into BookInList (listId,bookId) values (?,?);
`;
    const  bookLikeRow = await connection.query(bookLikeQuery,[bookcaseId,bookId]);
    return bookLikeRow[0];
}
// 책장에 책 드랍 
async function unLike(connection,bookcaseId,bookId)
{
    const bookunLikeQuery = `
    update BookInList set status=1 where listId=? AND bookId=? ;
`;
    const  bookunLikeRow = await connection.query(bookunLikeQuery,[bookcaseId,bookId]);
    return bookunLikeRow[0];
}
  
// 책장에 삽입된 책과 책장 조회
async function checkInsert(connection,bookcaseId,bookId)
{
    const checkInsertQuery = `
    select bookcase.id  as bookcaseId , b.id as bookId
      from MyBookList as bookcase join BookInList as bl on bookcase.id=bl.listId
      join Book as b on b.id=bl.bookId
      where bookcase.id=? and bl.bookId=? AND bl.status=0;
`;
    const  checkInsertRow = await connection.query(checkInsertQuery,[bookcaseId,bookId]);
    return checkInsertRow[0];
}

// 책장에 빠진 책과 책장 조회
async function checkDrop(connection,bookcaseId,bookId)
{
    const checkInsertQuery = `
    select bookcase.id  as bookcaseId , b.id as bookId
      from MyBookList as bookcase join BookInList as bl on bookcase.id=bl.listId
      join Book as b on b.id=bl.bookId
      where bookcase.id=? and bl.bookId=? AND bl.status=1;
`;
    const  checkInsertRow = await connection.query(checkInsertQuery,[bookcaseId,bookId]);
    return checkInsertRow[0];
}
//책장제거
async function deleteBookcase (connection,userId,bookcaseId){
    const deleteBookcaseQuery=`
    update MyBookList as bl join BookInList  as books on bl.id=books.listId set bl.status=1,books.status=1 where bl.id=? and userId=?;

    `;
    const  deleteBookcaseRow = await connection.query(deleteBookcaseQuery,[bookcaseId,userId]);
    return deleteBookcaseRow[0];
};
//제거된 책장 체크
async function checkDeleteBookcase (connection,userId,bookcaseId){
    const deleteBookcaseQuery=`
    select id as deletedBookcaseId
    from MyBookList
    where id=? and userId=?;
    `;
    const  checkDeleteBookcaseRow = await connection.query(deleteBookcaseQuery,[bookcaseId,userId]);
    return checkDeleteBookcaseRow[0];
};

//책장제거
async function addBookcase (connection,userId,title){
    const addBookcaseQuery=`
   insert into MyBookList (userId,name) values (?,?);

    `;
    const  addBookcaseRow = await connection.query(addBookcaseQuery,[userId,title]);
    return addBookcaseRow[0];
};

  module.exports = {
    selectBookListInBookCase,
    checkBookCase,
    Like,
    unLike,
    checkInsert,
    checkDrop,
    bookcaseList,
    deleteBookcase,
    checkDeleteBookcase,
    checkBookCaseName,
    addBookcase,
  };
  