const modelMitra = require('../models/mitra');

const getAllMitra = async (req, res) => {
  try {
    const [data] = await modelMitra.getAllMitra();
    res.json({
      message: 'Get All Mitra Berhasil',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'get All Mitra tidak menemukan mitra',
      serverMessage: err.message,
    });
  }
};
const getMitraById = async (req, res) => {
  const { idMitra } = req.params;
  try {
    const [data] = await modelMitra.getMitraById(idMitra);
    res.json({
      message: 'Get Mitra Berhasil',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'get Mitra tidak menemukan mitra',
      serverMessage: err.message,
    });
  }
};

module.exports = {
  getAllMitra,
  getMitraById,
};
