const ApiError = require('../utils/ApiError');
const { error } = require('../utils/response.helper');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return error(res, err.message, err.statusCode, err);
    }
    
    // Handle other types of errors
    console.error(err);
    return error(res, 'Internal Server Error', 500, err);
};

module.exports = errorHandler; 