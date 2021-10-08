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
  
  module.exports = {
      updateAddress,
      postAddressInfo
  };