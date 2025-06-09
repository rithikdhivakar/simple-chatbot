const messageRepository = require('../repositories/message.repository');
const ApiError = require('../utils/ApiError');

class MessageService {
    async getMessagesByConversationId(conversationId) {
        return await messageRepository.findByConversationId(conversationId);
    }

    async createMessage(conversationId, sender, content) {
        if (!content) {
            throw new ApiError(400, 'Message content is required');
        }
        return await messageRepository.create(conversationId, sender, content);
    }

    async updateMessageFeedback(messageId, feedback) {
        if (!['like', 'dislike'].includes(feedback)) {
            throw new ApiError(400, 'Invalid feedback value');
        }
        return await messageRepository.updateFeedback(messageId, feedback);
    }
}

module.exports = new MessageService(); 