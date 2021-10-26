async function getNoticeList (connection){
    noticeQuery=`
    select id as NoticeId, title,(select case when updatedAt like createdAt then date_format(createdAt,'%Y.%m.%d') else date_format(updatedAt,'%Y.%m.%d')  end ) as date , viewCount
    from Notice
    where status=0;
    `;

    const [noticeRow] = await connection.query(noticeQuery); 
    return noticeRow;
};

async function getNoticeContent (connection,contentId){
    noticeQuery=`
    select title , content, (select case when updatedAt like createdAt then date_format(createdAt,'%Y.%m.%d') else date_format(updatedAt,'%Y.%m.%d')  end ) as date ,viewCount
    from Notice
    where status=0 and id=?;
    `;

    const [noticeRow] = await connection.query(noticeQuery,contentId); 
    addCountQuery=`update Notice set viewCount=viewCount+1 where status=0 and id=? ;`;
    const addRow = await connection.query(addCountQuery,contentId);
    
    return noticeRow;
};

async function insertInquiry(connection,title,content,userId) {
    insertInquiryQuery = `
        insert into Inquiry(title,content,userId) values (?,?,?); 
    `;

    const insertInquiryRow = await connection.query(insertInquiryQuery,[title,content,userId]);
    return insertInquiryRow[0];

};
//자주묻는질문 리스트 조회
async function getAskedList(connection){
    askedListQuery=`
    select id, title , (select case when updatedAt like createdAt then date_format(createdAt,'%Y.%m.%d') else date_format(updatedAt,'%Y.%m.%d')  end ) as date 
    from FrequentlyAsk
    where status=0 ;
    `;

    const [askedListRow] = await connection.query(askedListQuery); 

    return askedListRow;
};
//자주묻는 특정 질문 내용 조회 
async function getAsked(connection,contentId){
    askedQuery=`
    select id, title , content,(select case when updatedAt like createdAt then date_format(createdAt,'%Y.%m.%d') else date_format(updatedAt,'%Y.%m.%d')  end ) as date 
    from FrequentlyAsk
    where status=0 and id=?;
    `;

    const [askedRow] = await connection.query(askedQuery,contentId); 

    return askedRow;
};

module.exports = {
    getNoticeList,
    getNoticeContent,
    insertInquiry,
    getAskedList,
    getAsked,
};