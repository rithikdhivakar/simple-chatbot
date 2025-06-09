const db = require('../config/database');

class ConversationRepository {
    async findAll() {
        const [rows] = await db.query(
            'SELECT * FROM conversations ORDER BY created_at DESC'
        );
        return rows;
    }

    async create(title) {
        const [result] = await db.query(
            'INSERT INTO conversations (title) VALUES (?)',
            [title]
        );
        return { id: result.insertId, title, created_at: new Date() };
    }

    async update(id, title) {
        await db.query(
            'UPDATE conversations SET title = ? WHERE id = ?',
            [title, id]
        );
        return { id: Number(id), title };
    }

    async delete(id) {
        await db.query('DELETE FROM conversations WHERE id = ?', [id]);
        return true;
    }
}

module.exports = new ConversationRepository(); 