const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const dataMemberCtrl = require('../controllers/dataMember');

router.get('/:iddata', auth, dataMemberCtrl.uploadData);
router.post('/:iddata', auth, dataMemberCtrl.updateData);

module.exports = router;