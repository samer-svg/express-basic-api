 //@description Middleware to handle requests for non-existent routes (404).
 //Creates an error object with a 404 status and passes it to the next error handler.

const notFound = (req, res, next) => {
  const error = new Error('page not found');
  error.status = 404;
  return next(error);
};

export default notFound;