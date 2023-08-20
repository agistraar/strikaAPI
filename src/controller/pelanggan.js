const modelPelanggan = require('../models/pelanggan');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createNewPelanggan = async (req, res) => {
  const { body } = req;
  try {
    await modelPelanggan.createNewPelanggan(body);
    res.json({
      code: 200,
      message: 'CREATE new user success',
      data: body,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: err.message,
    });
  }
};

const updatePelanggan = async (req, res) => {
  const { idPelanggan } = req.params;
  const { body } = req;
  try {
    await modelPelanggan.updatePelanggan(body, idPelanggan);
    res.json({
      code: 200,
      message: 'UPDATE pelanggan success',
      data: {
        id: idPelanggan,
        ...body,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: err.message,
    });
  }
};

const deletePelanggan = async (req, res) => {
  const { idPelanggan } = req.params;
  try {
    await modelPelanggan.deletePelanggan(idPelanggan);
    res.json({
      code: 200,
      message: 'DELETE pelanggan success',
      data: idPelanggan,
    });
  } catch (err) {
    res.status(500),
      json({
        code: 500,
        message: 'DELETE pelanggan gagal',
        data: err.message,
      });
  }
};

const loginPelanggan = async (req, res) => {
  const { body } = req;
  try {
    const [data] = await modelPelanggan.getIdPelanggan(body);

    bcrypt.compare(body.pass, data[0].password).then(function (result) {
      if (result) {
        res.json({
          code: 200,
          message: 'Login Success',
          data: data[0].id,
        });
      } else {
        res.status(404).json({
          code: 404,
          message: 'Password Salah',
          data: null,
        });
      }
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'Email atau Nomor Handphone tidak terdaftar',
      serverMessage: err.message,
    });
  }
};

const getInfoPelanggan = async (req, res) => {
  const id = req.query.id;
  console.log(id);

  try {
    const [data] = await modelPelanggan.getInfoPelanggan(id);
    res.json({
      message: 'Get Info Pelanggan Berhasil',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'Pelanggan tidak terdaftar',
      serverMessage: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { idPelanggan } = req.params;
  const { body } = req;

  try {
    const [data] = await modelPelanggan.getPassword(idPelanggan);
    bcrypt
      .compare(body.oldPass, data[0].password)
      .then(async function (result) {
        if (result) {
          try {
            await modelPelanggan.setPassword(body.newPass, idPelanggan);
            res.json({
              code: 200,
              message: 'Update Password Berhasil',
              data: body.newPass,
            });
          } catch (err) {
            res.status(500).json({
              code: 500,
              message: 'update password query gagal',
              error: err.message,
            });
          }
        } else {
          res.status(500).json({
            code: 500,
            message: 'Password Tidak Sama',
            data: null,
          });
        }
      });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: err.message,
    });
  }
};

module.exports = {
  createNewPelanggan,
  updatePelanggan,
  deletePelanggan,
  loginPelanggan,
  getInfoPelanggan,
  changePassword,
};
