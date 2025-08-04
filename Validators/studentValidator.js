const { body } = require('express-validator');

exports.createStudentValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('dob').isISO8601().withMessage('Invalid date'),
  body('email').isEmail().withMessage('Invalid email'),
  body('phone').isMobilePhone().withMessage('Invalid phone number'),
  body('address.street').notEmpty(),
  body('address.city').notEmpty(),
  body('address.state').notEmpty(),
  body('address.postalCode').notEmpty(),
  body('address.country').notEmpty(),
  body('rollNo').notEmpty(),
  body('class').notEmpty(),
  body('section').notEmpty()
];
