const ApiError = require("./ApiError");

const validateRule = (rule, data) => {
  const { field, condition, condition_value } = rule;
  let field_value;

  if (Array.isArray(data) || typeof data === "string") {
    field_value = data[field];
    if (!field_value)
      throw new ApiError(`field ${field} is missing from data.`, 400);
  } else if (typeof data === "object") {
    // Doing this to capture nested objects
    try {
      field_value = field.split(".").reduce((res, i) => res[i], data);
    } catch (e) {
      throw new ApiError(`field ${field} is missing from data.`, 400);
    }
  } else {
    throw new ApiError("data should be an array, an object or a string.", 400);
  }

  // Initial response which will be mofified if an error occurs of validation fails
  let response = {
    message: `field ${field} successfully validated.`,
    data: {
      validation: {
        error: false,
        field,
        field_value,
        condition,
        condition_value
      }
    }
  };

  const updateResponseAndThrowError = () => {
    response.message = `field ${field} failed validation.`;
    response.data.validation.error = true;
    throw new ApiError(response.message, 400, response.data);
  };

  switch (rule.condition) {
    case "eq":
      if (field_value === condition_value) {
        return response;
      } else {
        updateResponseAndThrowError();
      }
    case "neq":
      if (field_value !== condition_value) {
        return response;
      } else {
        updateResponseAndThrowError();
      }
    case "gt":
      if (field_value > condition_value) {
        return response;
      } else {
        updateResponseAndThrowError();
      }
    case "gte":
      if (field_value >= condition_value) {
        return response;
      } else {
        updateResponseAndThrowError();
      }
    case "contains":
      let contains = field_value.includes(condition_value);
      if (contains) {
        return response;
      } else {
        updateResponseAndThrowError();
      }
    default:
      throw new ApiError("condition is not valid.", 400);
  }
};

module.exports = validateRule;
