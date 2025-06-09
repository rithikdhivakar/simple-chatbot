// src/routes/conversations.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. List all conversations
router.get('/', async (req, res) => {
    const [rows] = await db.query(
        'SELECT * FROM conversations ORDER BY created_at DESC'
    );
    res.json(rows);
});

// 2. Create a new conversation
router.post('/', async (req, res) => {
    const [result] = await db.query(
        'INSERT INTO conversations (title) VALUES (?)',
        ['New Chat']
    );
    res.json({ id: result.insertId, title: 'New Chat', created_at: new Date() });
});

// 3. Get messages for one conversation
router.get('/:convId/messages', async (req, res) => {
    const [rows] = await db.query(
        'SELECT * FROM messages WHERE conversation_id = ? ORDER BY sent_at',
        [req.params.convId]
    );
    res.json(rows);
});

// 4. Post a new message
router.post('/:convId/messages', async (req, res) => {
    const { sender, content } = req.body;
    const [result] = await db.query(
        'INSERT INTO messages (conversation_id, sender, content) VALUES (?, ?, ?)',
        [req.params.convId, sender, content]
    );
    const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [
        result.insertId,
    ]);
    res.json(rows[0]);
});

// 5. Rename a conversation
router.put('/:convId', async (req, res) => {
    const convId = req.params.convId;
    const { title } = req.body;
    await db.query(
        'UPDATE conversations SET title = ? WHERE id = ?',
        [title, convId]
    );
    res.json({ id: Number(convId), title });
});

// 6. Delete a conversation
router.delete('/:convId', async (req, res) => {
    const convId = req.params.convId;
    await db.query('DELETE FROM conversations WHERE id = ?', [convId]);
    // messages cascade‐delete thanks to your FK ON DELETE CASCADE
    res.sendStatus(204);
});

// 7. Give feedback (like/dislike) on a message
router.patch('/:convId/messages/:msgId/feedback', async (req, res) => {
    const { msgId } = req.params;
    const { feedback } = req.body;                // 'like' or 'dislike'
    await db.query(
        'UPDATE messages SET feedback = ? WHERE id = ?',
        [feedback, msgId]
    );
    const [rows] = await db.query(
        'SELECT * FROM messages WHERE id = ?',
        [msgId]
    );
    res.json(rows[0]);
});

module.exports = router;