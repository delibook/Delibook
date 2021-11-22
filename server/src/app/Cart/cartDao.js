// 유저의 책가방 조회

async function selectCart(connection,userId)
{
    const selectCartQuery = `
    select distinct c.id as cartId ,l.id as libraryId,l.name as library , b.id as bookId,b.imageURL as bookThumbnail,
                b.name as bookTitle , b.author , (select case when b.quantity !=0 then "대여가능" else "대여불가능" end)
              as canLoan, b.quantity as bookQuantity, bc.quantity as putQuantity
from Cart as c join Library as l on c.libraryId = l.id
               join BookInCart as bc on c.id = bc.cartId
               join Book as b on bc.bookId = b.id
               join User as user on user.id= c.userId
where user.id=? && c.status=0 && bc.status = 0 ; -- cartID는 안넣어도돼

    `;
    const  selectCartRow = await connection.query(selectCartQuery,userId);
    return selectCartRow[0];
}

// 책가방의 가격 조회
async function selectCost(connection, userId)
{
    const costQuery = `select distinct IFNULL((select case when Distance.distance <= 1 then l.tip
        when Distance.distance between 1 and 2 then  l.tip+l.plusTip
        when Distance.distance between 2 and 3 then  l.tip+(l.plusTip*2)
        when Distance.distance between 3 and 4 then  l.tip+(l.plusTip*3)
        when Distance.distance between 4 and 5 then l.tip+(l.plusTip*4)
        else '배달불가' end ),'주소설정필수' ) as cost
from Library as l  join Cart as c on c.libraryId = l.id
join
(SELECT (6371*acos(cos(radians(a.latitude))*cos(radians(l.latitude))*cos(radians(l.longitude)
            -radians(a.longitude))+sin(radians(a.latitude))*sin(radians(l.latitude)))) AS distance , User.id as id
      FROM Library as l join Cart as c on  c.libraryId=l.id
                        join User on User.id = c.userId join Address as a on User.id = a.userId
      where User.id=? AND  a.isMain=1  and c.status=0
      ) as Distance
on Distance.id = c.userId
where c.userId=?;`;
        const selectCostRow = await connection.query(costQuery,[userId,userId]);
        return selectCostRow[0];
};

// 유저의 카트에 들어있는 책이 맞는지 체크
async function checkCart(connection,userId,cartId,bookId)
{
    const checkCartQuery = `
    -- 유저의 카트에 들어있는 책이 맞는 지 체크
    select user.id,c.id as cartId , bc.bookId as bookId
    from User as user join Cart as c on user.id=c.userId
                    join BookInCart as bc on bc.cartId=c.id
    where userId=? and c.id= ? and bc.bookId=?;
    `;
    const  checkCartRow = await connection.query(checkCartQuery,[userId,cartId,bookId]);
    return checkCartRow[0];
}

async function editCartBookNum (connection,cartId,bookId,type) {
    const editQuery = `
        call editBookNum(?,?,?) ;

    `;
    const editRow = await connection.query(editQuery,[cartId,bookId,type]);
    return editRow[0];
}

async function insertCart (connection,userId,bookId,libraryId) {
    const insertCartQuery = `
    call insertCart ( ?, ?, ?);

    `;
    const insertCartRow = await connection.query(insertCartQuery,[userId,bookId,libraryId]);
    return insertCartRow[0];
}

async function checkBookAndLibrary (connection,bookId,libraryId) {
    const checkQuery = `
        select b.id, b.libraryId from Book as b join Library as l on l.id=b.libraryId where b.id=? and l.id=?
    `;
    const checkRow = await connection.query(checkQuery ,[bookId,libraryId]);
    return checkRow[0]; 

} 
async function checkUserCart (connection,userId,cartId) {
    const checkQuery = `
        select c.id,c.userId from Cart as c where c.userId=? and c.id=? ; 
    `;
    const checkRow = await connection.query(checkQuery ,[userId,cartId]);
    return checkRow[0]; 

} 

async function dropCart (connection,userId,cartId) {
    const dropCartQuery = `
    call dropCart(?,?);
    `;
  
    const dropCartRow = await connection.query(dropCartQuery ,[cartId,userId,cartId]);
    
    return dropCartRow[0]; 

} 
async function dropCartBook (connection,cartId,bookId) {
    const dropCartBookQuery = `
    update BookInCart set status=1 where cartId=? and bookId=? and status=0;
    `;
    const selectDropCartBookQuery = `
    select cartId,bookId,status from BookInCart where cartId=? and bookId=? and status=1;
    `;
    const dropCartBookRow = await connection.query(dropCartBookQuery ,[cartId,bookId]);
    const selectDropCartBookRow = await connection.query(selectDropCartBookQuery ,[cartId,bookId]);
    return selectDropCartBookRow[0]; 

} 

async function canInsertCart(connection,userId,libraryId) {
    const canInsertCartQuery = `
    select c.id as cartId
    from Cart as c
    where c.userId=? and c.libraryId!=? and c.status =0;
    `;
    const editRow = await connection.query(canInsertCartQuery,[userId,libraryId]);
    return editRow[0];
}

async function getOneCart(connection,cartId) {
    const getOneCartQuery = `
    select distinct c.id as cartId ,l.id as libraryId,l.name as library , b.id as bookId,b.imageURL as bookThumbnail,
                b.name as bookTitle , b.author , (select case when b.quantity !=0 then "대여가능" else "대여불가능" end)
              as canLoan, b.quantity as bookQuantity, bc.quantity as putQuantity
from Cart as c join Library as l on c.libraryId = l.id
               join BookInCart as bc on c.id = bc.cartId
               join Book as b on bc.bookId = b.id
               join User as user on user.id= c.userId
where c.id=? && c.status=1 && bc.status = 0;
    `;
    const oneCartRow = await connection.query(getOneCartQuery,cartId);
    return oneCartRow[0];
}

  module.exports = {
    selectCart,
    checkCart,
    editCartBookNum ,
    insertCart,
    checkBookAndLibrary,
    checkUserCart,
    dropCart,
    dropCartBook,
    selectCost,
    canInsertCart,
    getOneCart,
  };
  