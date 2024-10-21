// controllers/orderController.js
const Order = require('../models/orderModel');
const Pizza = require('../models/pizzaModel');

const placeOrder = async (req, res) => {
    const { pizzaId, size, quantity } = req.body;
    
    try {
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) {
            return res.status(404).send('Pizza not found');
        }

        // Find the size from the sizes array
        const selectedSize = pizza.sizes.find(s => s.size.toLowerCase() === size.toLowerCase());

        if (!selectedSize) {
            return res.status(400).send('Invalid pizza size');
        }

        const totalPrice = selectedSize.price * quantity; // Calculate total price

        // Create the order
        const order = new Order({
            userId: req.user._id,
            pizzaId,
            size: selectedSize.size,
            quantity,
            price: totalPrice,       
        });

        await order.save();
        res.status(201).json({ message: `Order placed successfully: $${totalPrice}` });
    } catch (error) {
        console.error('Error placing the order:', error);
        res.status(500).send('Error placing the order');
    }
};




// Get all orders (Admin only)
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('pizzaId', 'name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ Error: 'Error fetching orders' });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        await Order.findByIdAndUpdate(id, { status });
        res.json({ Message: 'Order status updated' });
    } catch (error) {
        res.status(500).json({ Error: 'Error updating order status' });
        console.log(error.message)
    }
};


module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus
}