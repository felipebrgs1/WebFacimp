const express = require('express');
const router = express.Router();
const estabelecimentoController = require('../controllers/estabelController');

// Rota para criar um novo estabelecimento
router.post('/', estabelecimentoController.createEstabelecimento);
router.get('/', estabelecimentoController.getEstabelecimentos);
router.get('/:id', estabelecimentoController.getEstabelecimentoById);

module.exports = router;
