const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("username").notEmpty().withMessage("Username is required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

exports.validateSigninRequest = [
  check("username").notEmpty().withMessage("Username is required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
