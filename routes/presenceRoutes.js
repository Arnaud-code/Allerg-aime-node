const express = require('express');
const presenceController = require('../controllers/presenceController');
const router = express.Router();

router.get('/', presenceController.indexPresences);
router.get('/add/:pslug/:aslug', presenceController.addPresence);
router.get('/delete/:id', presenceController.deletePresence);

module.exports = router;
