const requestLogger = (req, res, next) => {
  console.log('---');
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('Time:  ', new Date().toISOString());
  console.log('---');

  // This is the most important part:
  // It passes the request to the next middleware or to the route handler.
  next(); 
};

module.exports = requestLogger;