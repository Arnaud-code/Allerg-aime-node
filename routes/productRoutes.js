const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.indexProducts);
router.post('/', productController.createProduct);
router.get('/:slug', productController.showProduct);
router.post('/:slug', productController.updateProduct);
router.get('/:slug/trash', productController.trashProduct);
router.get('/:slug/delete', productController.deleteProduct);

module.exports = router;