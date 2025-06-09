const express = require('express');
const cors = require('cors');
const conversationRoutes = require('./routes/conversations.routes');
const messageRoutes = require('./routes/messages.routes');
const errorHandler = require('./middlewares/error.handler');
const notFoundHandler = require('./middlewares/not-found.handler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/conversations', conversationRoutes);
app.use('/api/conversations', messageRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app; 