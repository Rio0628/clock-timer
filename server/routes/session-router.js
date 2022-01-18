const express = require('express');
const SessionCtrl = require('../controllers/session-cntrl');
const router = express.Router();

router.post('/session', SessionCtrl.createSession);
router.delete('/session/:id', SessionCtrl.deleteSession);
router.get('/session/:id', SessionCtrl.getSessionById);
router.get('/session', SessionCtrl.getSessions);

module.exports = router;