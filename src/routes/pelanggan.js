const express = require('express');

const Controller = require('../controller/pelanggan.js');

const router = express.Router();

// CREATE - POST
router.post('/', Controller.createNewPelanggan);

// GET - INFO PELANGGAN
router.get('/getInfoPelanggan', Controller.getInfoPelanggan);

// READ - GET - LOGIN GET ID
router.post('/login', Controller.loginPelanggan);

// UPDATE - PATCH
router.patch('/:idPelanggan', Controller.updatePelanggan);

// UPDATE - PATCH - CHANGE PASSWORD
router.patch('/pass/:idPelanggan', Controller.changePassword);

// DELETE - DELETE
router.delete('/:idPelanggan', Controller.deletePelanggan);

module.exports = router;
