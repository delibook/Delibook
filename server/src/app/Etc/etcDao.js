async function getNoticeList (connection){
    noticeQuery=`
    select id as NoticeId, title, content, (select case when updatedAt like createdAt then date_format(createdAt,'%Y.%m.%d') else date_format(updatedAt,'%Y.%m.%d')  end ) as date , viewCount
    from Notice
    where status=0;
    `;

    const [noticeRow] = await connection.query(noticeQuery); 
    addCountQuery=`update Notice set viewCount=viewCount+1 where status=0;`;
    const addRow = await connection.query(addCountQuery);
    
    return noticeRow;
};

module.exports = {
    getNoticeList,
};