const express = require('express');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

router.get('/', categoryController.indexCategories);
router.post('/', categoryController.createCategory);
router.get('/:slug', categoryController.showCategory);
router.post('/:slug', categoryController.updateCategory);
router.get('/:slug/trash', categoryController.trashCategory);
router.get('/:slug/delete', categoryController.deleteCategory);

module.exports = router;
