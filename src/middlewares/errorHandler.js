'use strict';

exports.notFoundHandler = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const isJson = req.headers['content-type'] === 'application/json' || req.xhr;

  if (isJson) {
    return res.status(status).json({
      error: {
        message: err.message || 'Internal Server Error'
      }
    });
  }

  return res.status(status).render('error', {
    title: `${status} Error`,
    message: err.message || 'Internal Server Error'
  });
};


