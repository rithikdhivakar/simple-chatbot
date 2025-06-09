const messageService = require('../services/message.service');
const { success, error } = require('../utils/response.helper');

class MessageController {
    async getMessages(req, res, next) {
        try {
            const { convId } = req.params;
            const messages = await messageService.getMessagesByConversationId(convId);
            return success(res, messages);
        } catch (err) {
            next(err);
        }
    }

    async createMessage(req, res, next) {
        try {
            const { convId } = req.params;
            const { sender, content } = req.body;
            const message = await messageService.createMessage(convId, sender, content);
            return success(res, message, 'Message created', 201);
        } catch (err) {
            next(err);
        }
    }

    async updateFeedback(req, res, next) {
        try {
            const { msgId } = req.params;
            const { feedback } = req.body;
            const message = await messageService.updateMessageFeedback(msgId, feedback);
            return success(res, message, 'Feedback updated');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new MessageController(); 