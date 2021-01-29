const { ApiError, validateRule } = require("../utils");

const indexController = req => {
  let { body } = req;

  if (!body.hasOwnProperty("rule")) {
    throw new ApiError("rule is required.", 400);
  }
  if (!body.hasOwnProperty("data")) {
    throw new ApiError("data is required.", 400);
  }

  if (typeof body.rule !== "object") {
    throw new ApiError("rule should be an object.", 400);
  }

  if (
    !Array.isArray(body.data) &&
    typeof body.data !== "object" &&
    typeof body.data !== "string"
  ) {
    throw new ApiError("data should be an array, an object or a string.", 400);
  }

  return validateRule(body.rule, body.data);
};

module.exports = indexController;
