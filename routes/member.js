const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const memberCtrl = require('../controllers/member');

router.post('/new_account', memberCtrl.createMember);
router.post('/login', memberCtrl.login);
router.delete('/:idmember', auth, memberCtrl.deleteMember);

module.exports = router;