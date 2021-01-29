const jsend = {
  error: (message, data = null) => {
    return { message, status: "error", data };
  },
  success: (message, data = null) => {
    return { message, status: "success", data };
  }
};

module.exports = jsend;
