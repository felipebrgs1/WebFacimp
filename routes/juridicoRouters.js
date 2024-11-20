const express = require('express');
const router = express.Router();
const userJuridicoController = require('../controllers/juridicoController');

// Rota para criar um novo estabelecimento
router.post('/', userJuridicoController.cadastroUserJuridico);
router.get('/', userJuridicoController.getJuridico);

module.exports = router;
