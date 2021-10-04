async function updateAddress(connection, updateParams) {
    const updateAddressQuery = `
    call editAddress (?,?,?,?,?,?,?);
    `;
    const updateAddressRow = await connection.query(updateAddressQuery, updateParams);
    return updateAddressRow[0];
  }
  
  
  module.exports = {
    updateAddress,
  };