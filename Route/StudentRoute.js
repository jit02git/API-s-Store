const express = require('express');
const studentRouter = express.Router();
const studentController = require('../Controller/StudentController');
const { createStudentValidation } = require('../Validators/studentValidator');
const validate = require('../Middleware/Validate');

// POST /api/students
studentRouter.post('/create', createStudentValidation, validate, studentController.createStudent);
// GET /api/students
studentRouter.get('/', studentController.getStudent);
// PUT /api/students/:id
studentRouter.put('/:id', studentController.updateStudent);
// DELETE /api/students/:id
studentRouter.delete('/:id', studentController.deleteStudent);

module.exports = studentRouter;
