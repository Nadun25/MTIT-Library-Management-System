const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(res.statusCode && res.statusCode !== 200 ? res.statusCode : 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};

module.exports = errorHandler;