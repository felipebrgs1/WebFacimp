const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.delete('/:id', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/:id', productController.productbyId);
module.exports = router;
