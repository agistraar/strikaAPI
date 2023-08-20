const dbPool = require('../config/database');

const getAllMitra = () => {
  const SQLQuery = `SELECT * FROM MITRA`;
  return dbPool.execute(SQLQuery);
};

const getMitraById = (id) => {
  const SQLQuery = `SELECT * FROM MITRA WHERE id = '${id}'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllMitra,
  getMitraById,
};
