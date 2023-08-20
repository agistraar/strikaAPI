const dbPool = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createNewPelanggan = async (body) => {
  bcrypt.hash(body.pass, saltRounds).then(function (hash) {
    const SQLQuery = `INSERT INTO PELANGGAN (email, telp, password, nama, alamat) 
                    VALUE ('${body.email}', '${body.telp}', '${hash}', '${body.nama}', 
                    '${body.alamat}')`;

    return dbPool.execute(SQLQuery);
  });
};

const updatePelanggan = (body, idPelanggan) => {
  const SQLQuery = `UPDATE PELANGGAN 
                    SET email='${body.email}', telp='${body.telp}', nama='${body.nama}', alamat='${body.alamat}'
                    WHERE id='${idPelanggan}'`;

  return dbPool.execute(SQLQuery);
};

const getIdPelanggan = (body) => {
  const SQLQuery = `SELECT id,password FROM PELANGGAN WHERE EMAIL = '${body.user}' OR TELP = '${body.user}'`;
  return dbPool.execute(SQLQuery);
};

const getInfoPelanggan = (id) => {
  const SQLQuery = `SELECT nama,email,telp,alamat FROM PELANGGAN WHERE id = ${id}`;
  return dbPool.execute(SQLQuery);
};

const getPassword = (id) => {
  const SQLQuery = `SELECT password FROM PELANGGAN WHERE id = '${id}'`;
  return dbPool.execute(SQLQuery);
};

const setPassword = (pass, id) => {
  bcrypt.hash(pass, saltRounds).then(function (hash) {
    const SQLQuery = `UPDATE PELANGGAN 
                    SET password = '${hash}'
                    WHERE id='${id}'`;

    return dbPool.execute(SQLQuery);
  });
};

const deletePelanggan = (id) => {
  const SQLQuery = `DELETE FROM PELANGGAN WHERE id = ${id}`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  createNewPelanggan,
  updatePelanggan,
  getIdPelanggan,
  getInfoPelanggan,
  getPassword,
  setPassword,
  deletePelanggan,
};
