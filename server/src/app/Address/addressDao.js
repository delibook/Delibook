async function updateAddress(connection, updateParams) {
    const updateAddressQuery = `
    call editAddress (?,?,?,?,?,?,?);
    `;
    const updateAddressRow = await connection.query(updateAddressQuery, updateParams);
    return updateAddressRow[0];
  }


// 주소 insert
async function postAddressInfo(connection, userId, address, detailAddress, latitude, longitude) {
    const postAddressInfoQuery = `
    INSERT INTO Address(userId, address, detailAddress, latitude, longitude)
    VALUES (?, ?, ?, ?, ?);
  `
    const [postAddressInfoRow] = await connection.query(postAddressInfoQuery, [userId, address, detailAddress, latitude, longitude]);
    return postAddressInfoRow;
}
  
async function selectAddress (connection,userId) {
  // 내 주소 조회 API --status 1 is deleted
  const selectAddressQuery= `
  select a.userId ,a.id as addressId, a.detailAddress, a.address, a.latitude, a.longitude, (select case when a.isMain=1 then "main" else "non-main"end) as isMain
  from Address as a
  where a.userId=? and a.status!=1 ; 
`;
  const selectAddressRow = await connection.query(selectAddressQuery, userId);
  return selectAddressRow[0];
}


async function checkUserAddress (connection,userId,addressId) {
  // 유저아이디와 주소아이디의 유저아이디가 일치하는지 체크 
  const checkUserAddressQuery= `
    select a.id ,a.userId from Address as a where a.userId=? and a.id=? ;
`;
  const checkUserAddressRow = await connection.query(checkUserAddressQuery, [userId,addressId]);
  return checkUserAddressRow[0];
}

async function checkDeletedAddress(connection,userId,addressId) {
  // 삭제된 주소인지 체크 
  const checkDeletedAddressQuery= `
    select a.id ,a.userId from Address as a where a.userId=? and a.id=? and a.status=1;
`;
  const checkDeletedAddressRow = await connection.query(checkDeletedAddressQuery, [userId,addressId]);
  return checkDeletedAddressRow[0];
}

async function deleteAddress (connection,userId,addressId) {
  // 특정 주소 삭제
  const deleteAddressQuery= `
  update Address set status=1, isMain=0 where userId=? and id=? ;
`;
  const deleteAddressRow = await connection.query(deleteAddressQuery, [userId,addressId]);
  return deleteAddressRow[0];
}


async function setMainAddress (connection,userId,addressId) {
  // 대표주소 설정 
  const setMainAddressQuery= `
    call setMainAddress(?,?);
`;
  const setMainAddressRow = await connection.query(setMainAddressQuery, [addressId,userId]);
  return setMainAddressRow[0];
}

  module.exports = {
      updateAddress,
      postAddressInfo,
      selectAddress,
      setMainAddress,
      checkUserAddress,
      deleteAddress,
      checkDeletedAddress,

  };