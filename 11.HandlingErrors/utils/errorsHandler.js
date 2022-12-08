errorsHandler = function(callback) {
  return async function(req, res, next) {
    try {
      await callback(req, res);
    } catch(err) {
      next(err);
    }
  }
}

module.exports = errorsHandler;