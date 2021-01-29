const { ApiError } = require("../utils");

const notFound = () => {
  return (req, res, next) => {
    const e = new ApiError("This route has not been implemented.", 404);
    next(e);
  };
};

module.exports = notFound;
