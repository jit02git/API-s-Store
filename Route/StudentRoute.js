const express = require('express');
const studentRouter = express.Router();
const studentController = require('../Controller/StudentController');
const { createStudentValidation } = require('../Validators/studentValidator');
const validate = require('../Middleware/Validate');

// POST /api/students
studentRouter.post('/create', createStudentValidation, validate, studentController.createStudent);

module.exports = studentRouter;
