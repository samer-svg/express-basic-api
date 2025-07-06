// Middleware to log request details (method, protocol, host, and URL) to the console.
import colors from 'colors'

const logger = (req, res, next) => {
  const methodColor = {
    GET: 'green',
    POST: 'blue',
    PUT: 'yellow',
    DELETE: 'red'
  }
  const color = methodColor[req.method] || 'white';
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`[color]
  );
  return next();
};

export default logger;