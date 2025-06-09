const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');

router.get('/:convId/messages', messageController.getMessages);
router.post('/:convId/messages', messageController.createMessage);
router.patch('/:convId/messages/:msgId/feedback', messageController.updateFeedback);

module.exports = router; 