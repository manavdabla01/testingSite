// routes/userRoutes.js
const express = require('express');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

// User signup (Admin or Customer) with email
router.post('/signup', signup);

// User login (Admin or Customer)
router.post('/login', login);

module.exports = router;
