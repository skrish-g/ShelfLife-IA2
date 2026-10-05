const validate = (requiredFields) => {
  return (req, res, next) => {
    for (const field of requiredFields) {
      if (req.body[field] === undefined || req.body[field] === "") {
        return res.status(400).json({
          message: `${field} is required`,
        });
      }
    }

    next();
  };
};

module.exports = validate;