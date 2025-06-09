const conversationService = require('../services/conversation.service');
const { success, error } = require('../utils/response.helper');

class ConversationController {
    async getAllConversations(req, res, next) {
        try {
            const conversations = await conversationService.getAllConversations();
            return success(res, conversations);
        } catch (err) {
            next(err);
        }
    }

    async createConversation(req, res, next) {
        try {
            const conversation = await conversationService.createConversation();
            return success(res, conversation, 'Conversation created', 201);
        } catch (err) {
            next(err);
        }
    }

    async updateConversation(req, res, next) {
        try {
            const { convId } = req.params;
            const { title } = req.body;
            const conversation = await conversationService.updateConversation(convId, title);
            return success(res, conversation, 'Conversation updated');
        } catch (err) {
            next(err);
        }
    }

    async deleteConversation(req, res, next) {
        try {
            const { convId } = req.params;
            await conversationService.deleteConversation(convId);
            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ConversationController(); 