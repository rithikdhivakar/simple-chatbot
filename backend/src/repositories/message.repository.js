const db = require('../config/database');

class MessageRepository {
    async findByConversationId(conversationId) {
        const [rows] = await db.query(
            'SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at',
            [conversationId]
        );
        return rows;
    }

    async create(conversationId, sender, content) {
        const [result] = await db.query(
            'INSERT INTO messages (conversation_id, sender, content) VALUES (?, ?, ?)',
            [conversationId, sender, content]
        );
        const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [
            result.insertId,
        ]);
        return rows[0];
    }

    async updateFeedback(messageId, feedback) {
        await db.query(
            'UPDATE messages SET feedback = ? WHERE id = ?',
            [feedback, messageId]
        );
        const [rows] = await db.query(
            'SELECT * FROM messages WHERE id = ?',
            [messageId]
        );
        return rows[0];
    }
}

module.exports = new MessageRepository(); 