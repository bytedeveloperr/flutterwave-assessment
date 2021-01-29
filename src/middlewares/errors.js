const { jsend } = require("../utils");

const errors = () => {
  return (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      err.message = "Invalid JSON payload passed.";
    }
    let statusCode = err.statusCode || 500;
    res.status(statusCode).json(jsend.error(err.message, err.data || null));
  };
};

module.exports = errors;
