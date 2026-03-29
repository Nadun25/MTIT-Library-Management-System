/**
 * Global Error Handler
 * ------------------------------------
 * Handles unexpected server errors
 */

const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode || 500).json({
        success: false,
        error: err.message || 'Server Error'
    });
};

module.exports = errorHandler;