// src/index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount the conversations routes
const convRoutes = require('./routes/conversations');
app.use('/api/conversations', convRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`Backend listening at http://localhost:${PORT}`)
);