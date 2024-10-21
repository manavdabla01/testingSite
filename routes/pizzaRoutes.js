// routes/pizzaRoutes.js
const express = require('express');
const { addPizza, getPizzas } = require('../controllers/pizzaController');
const { authenticateAdminJWT } = require('../Middleware/authMiddleware');
const router = express.Router();

// Admin: Add a new pizza
router.post('/', authenticateAdminJWT, addPizza);

// Public: Get pizzas
router.get('/', getPizzas);

module.exports = router;
