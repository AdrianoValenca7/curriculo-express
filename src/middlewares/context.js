const contextMiddleware = (req, res, next) => {
  req.context = {
    me: null,
  };

  next();
};

export default contextMiddleware;