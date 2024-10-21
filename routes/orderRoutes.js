// routes/orderRoutes.js
const express = require('express');
const { placeOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const { authenticateJWT, authenticateAdminJWT } = require('../Middleware/authMiddleware');
const router = express.Router();

// Customer: Place a new order
router.post('/', authenticateJWT, placeOrder);

// Admin: Get all orders
router.get('/', authenticateAdminJWT, getOrders);

// Admin: Update order status
router.patch('/:id', authenticateAdminJWT, updateOrderStatus);

module.exports = router;
