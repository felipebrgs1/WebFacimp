const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelecimentoController');

// Rota para criar um novo estabelecimento
router.post('/', estabelecimentoController.createEstabelecimento);
router.get('/', estabelecimentoController.getEstabelecimentos);


module.exports = router;
