const AuthController = require('../Controller/AuthController');
const express = require('express');
const router = express.Router();


// Authentication Routes
router.post('/register', AuthController.register);

module.exports = router;
