const { validationResult } = require("express-validator");

const queryValidation = (validations) => {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        await validation.run(req);
        // if (result.errors.length) {
        //   throw new Error("error")
        // }
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      next()
    } catch (e) {
      return res.status(500).json(({
        error: e.toString()
      }))
    }
  };
};


module.exports = queryValidation;

