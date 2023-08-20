const express = require('express');

const Controller = require('../controller/order.js');

const router = express.Router();

router.post('/', Controller.createNewOrder);

router.get('/:idOrder', Controller.getOrderById);

router.get('/going/:idPelanggan', Controller.getOrderActive);

router.patch('/:idOrder', Controller.setOrderDone);

router.get('/history/:idPelanggan', Controller.getHistoryOrder);

module.exports = router;
