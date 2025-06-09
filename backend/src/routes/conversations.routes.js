const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversation.controller');

router.get('/', conversationController.getAllConversations);
router.post('/', conversationController.createConversation);
router.put('/:convId', conversationController.updateConversation);
router.delete('/:convId', conversationController.deleteConversation);

module.exports = router; 