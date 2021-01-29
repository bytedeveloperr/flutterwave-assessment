const jsend = require("./jsend");

const requestHandler = controller => {
  return async (req, res, next) => {
    try {
      const { message, data } = await controller(req);
      res.json(jsend.success(message, data));
    } catch (e) {
      next(e);
    }
  };
};

module.exports = requestHandler;
