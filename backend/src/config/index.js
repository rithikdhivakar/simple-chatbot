require('dotenv').config();

module.exports = {
    port: process.env.PORT || 4000,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    // Add other configuration as needed
}; 