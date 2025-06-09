const conversationRepository = require('../repositories/conversation.repository');
const ApiError = require('../utils/ApiError');

class ConversationService {
    async getAllConversations() {
        return await conversationRepository.findAll();
    }

    async createConversation(title = 'New Chat') {
        return await conversationRepository.create(title);
    }

    async updateConversation(id, title) {
        if (!title) {
            throw new ApiError(400, 'Title is required');
        }
        return await conversationRepository.update(id, title);
    }

    async deleteConversation(id) {
        return await conversationRepository.delete(id);
    }
}

module.exports = new ConversationService(); 