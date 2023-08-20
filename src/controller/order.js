const modelOrder = require('../models/order');

const createNewOrder = async (req, res) => {
  const { body } = req;
  try {
    await modelOrder.createNewOrder(body);
    const [id] = await modelOrder.getOrderActive(body.idPelanggan);
    res.json({
      code: 200,
      message: 'CREATE new order success',
      data: id,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server Error',
      serverMessage: err.message,
    });
  }
};

const getOrderById = async (req, res) => {
  const { idOrder } = req.params;
  try {
    const [data] = await modelOrder.getOrderById(idOrder);
    res.json({
      message: 'Get Order Berhasil',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'Order Tidak Ditemukan',
      serverMessage: err.message,
    });
  }
};

const setOrderDone = async (req, res) => {
  const { idOrder } = req.params;
  const { body } = req;
  try {
    await modelOrder.setOrderDone(idOrder, body);
    res.json({
      code: 200,
      message: 'Order update success',
      data: {
        id: idOrder,
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

const getHistoryOrder = async (req, res) => {
  const { idPelanggan } = req.params;
  try {
    const [data] = await modelOrder.getHistoryOrder(idPelanggan);
    res.json({
      code: 200,
      message: 'Get History',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'Get History Gagal',
      serverMessage: err.message,
    });
  }
};

const getOrderActive = async (req, res) => {
  const { idPelanggan } = req.params;
  try {
    const [data] = await modelOrder.getOrderActive(idPelanggan);
    res.json({
      message: 'Get Order Berhasil',
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      code: 404,
      message: 'Order Tidak Ditemukan',
      serverMessage: err.message,
    });
  }
};

module.exports = {
  createNewOrder,
  getOrderById,
  setOrderDone,
  getHistoryOrder,
  getOrderActive,
};
