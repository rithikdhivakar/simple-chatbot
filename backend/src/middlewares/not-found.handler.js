const { error } = require('../utils/response.helper');

const notFoundHandler = (req, res) => {
    return error(res, 'Route not found', 404);
};

module.exports = notFoundHandler; 