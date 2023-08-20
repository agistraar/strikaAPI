const express = require('express');

const Controller = require('../controller/mitra.js');

const router = express.Router();

router.get('/all', Controller.getAllMitra);
router.get('/:idMitra', Controller.getMitraById);

module.exports = router;
