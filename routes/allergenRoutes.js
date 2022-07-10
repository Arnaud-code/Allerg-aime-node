const express = require('express');
const allergenController = require('../controllers/allergenController');
const router = express.Router();

router.get('/', allergenController.indexAllergens);
router.post('/', allergenController.createAllergen);
router.get('/:slug', allergenController.showAllergen);
router.post('/:slug', allergenController.updateAllergen);
router.get('/:slug/delete', allergenController.deleteAllergen);

module.exports = router;
