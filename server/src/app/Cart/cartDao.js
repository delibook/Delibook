// 유저의 책가방 조회
async function selectCart(connection,userId)
{
    const selectCartQuery = `
    select distinct c.id as cartId ,l.id as libraryId,l.name as library , b.id as bookId,b.imageURL as bookThumbnail,
                b.name as bookTitle , b.author , (select case when b.quantity !=0 then "대여가능" else "대여불가능" end)
              as canLoan, b.quantity as bookQuantity
    from Cart as c join Library as l on c.libraryId = l.id
               join BookInCart as bc on c.id = bc.cartId
               join Book as b on bc.bookId = b.id
               join User as user on user.id= c.userId
    where user.id=? && c.status=0; -- cartID는 안넣어도돼
    `;
    const  selectCartRow = await connection.query(selectCartQuery,userId);
    return selectCartRow[0];
}

  module.exports = {
    selectCart,
  };
  