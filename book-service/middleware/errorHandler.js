const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Check for Mongoose CastError (invalid ID)
    if (err.name === 'CastError') {
        statusCode = 404;
        err.message = 'Resource not found';
    }

    res.status(statusCode).json({
        success: false,
        error: err.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;
