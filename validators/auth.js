const { check, validationResult } = require("express-validator");

//validation middlewares
// These methods are all available via require('express-validator')
//Check([field, message]), field: a string or an array of strings of field names to valiate against, message: an error message to use when failed validators don't specify a message
//.notEmpty() => Adds a validator to check if a value is not empty; that is, a stirng with a length of 1 or bigger.
//check('userName').notEmpty();
//complete=> check('username').notEmpty().withMessage(),

exports.validateSignupRequest = [
  check("fullName").notEmpty().withMessage("Full name is required."),
  check("email")
    .isEmail()
    .withMessage("Valid email (example@example.com) is required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

exports.validateSigninRequest = [
  check("email")
    .isEmail()
    .withMessage("Valid email (example@example.com) is required."),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long."),
];

//validationResult(req) this method is available via require('express-validator')
//req: the express request object
//Returns: a Result object
//Extracts the validation errors from  a request and makes them available in a Result object.
//Each error returned by .array() and .mapped() methods has the following format by default:

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};
