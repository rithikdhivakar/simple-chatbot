const success = (res, data, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const error = (res, message = 'Error', statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error ? error.message : undefined
    });
};

module.exports = {
    success,
    error
}; 