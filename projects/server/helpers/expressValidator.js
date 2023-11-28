const { validationResult } = require("express-validator");

const queryValidation = (validations) => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        const result = await validation.run(req);
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      next()
    } catch (e) {
      res.status(500).json(({
        error: e.toString()
      }))
    }
  };
};

module.exports = queryValidation;

