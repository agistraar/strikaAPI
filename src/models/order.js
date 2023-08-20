const dbPool = require('../config/database');

const createNewOrder = (body) => {
  const SQLQuery = `INSERT INTO ORDERS (id_pelanggan, id_mitra, berat, kusut, rapi, durasi, biaya, metode, komentar, tanggal, is_done, rating) 
                    VALUE (${body.idPelanggan}, ${body.idMitra}, ${body.berat}, '${body.kusut}', '${body.rapi}', '${body.durasi}',  ${body.biaya}, '${body.metode}', DEFAULT, CURDATE(), DEFAULT, DEFAULT)`;

  return dbPool.execute(SQLQuery);
};

const getOrderById = (id) => {
  const SQLQuery = `SELECT orders.id, mitra.nama, mitra.email, pelanggan.alamat, berat, kusut, rapi, durasi, biaya, metode, komentar, DATE_FORMAT(tanggal,'%y-%m-%d') as tanggal, is_done, rating FROM ORDERS, MITRA, PELANGGAN WHERE orders.id = '${id}' AND id_pelanggan = pelanggan.id AND id_mitra = mitra.id`;
  return dbPool.execute(SQLQuery);
};

const getOrderActive = (id) => {
  const SQLQuery = `SELECT orders.id, mitra.nama, mitra.email FROM ORDERS, MITRA WHERE id_pelanggan = ${id} AND is_done = 0 AND id_mitra = mitra.id`;
  return dbPool.execute(SQLQuery);
};

const setOrderDone = (id, body) => {
  const SQLQuery = `UPDATE ORDERS 
                    SET komentar='${body.komentar}', is_done= 1, rating='${body.rating}'
                    WHERE id='${id}'`;

  return dbPool.execute(SQLQuery);
};

const getHistoryOrder = (id) => {
  const SQLQuery = `SELECT orders.id, mitra.nama, mitra.email, mitra.alamat, berat, kusut, rapi, durasi, biaya, metode, komentar, tanggal, is_done, rating FROM ORDERS, MITRA, PELANGGAN WHERE id_pelanggan = ${id} AND is_done = 1 AND id_pelanggan = pelanggan.id AND id_mitra = mitra.id`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createNewOrder,
  getOrderById,
  setOrderDone,
  getHistoryOrder,
  getOrderActive,
};
