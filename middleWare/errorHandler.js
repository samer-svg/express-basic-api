
 // Custom error handling middleware.
 // It sends a JSON response with the appropriate error status and message.
 // Defaults to 500 (Internal Server Error) if no status is provided on the error object.

const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({ msg: err.message || 'An unexpected error occurred' });
};

export default errorHandler;