// controllers/pizzaController.js
const Pizza = require('../models/pizzaModel');

// Add new pizza (Admin only)
const addPizza = async (req, res) => {
    const { name, toppings, sizes } = req.body;
    
    // Input validation
    if (!name || !toppings || !sizes || sizes.length === 0) {
        return res.status(400).json({ Error: 'Please provide all required fields: name, toppings, and sizes' });
    }

    try {
        const newPizza = new Pizza({ name, toppings, sizes });
        await newPizza.save();
        res.status(201).json({ Message: 'Pizza added successfully', pizza: newPizza });
    } catch (error) {
        res.status(500).json({ Error: 'Error adding pizza' });
        console.error(error.message);
    }
};

// Get all pizzas (Public)
const getPizzas = async (req, res) => {
    try {
        const pizzas = await Pizza.find();
        res.json(pizzas);
    } catch (error) {
        res.status(500).json({ Error: 'Error fetching pizzas' });

    }
};

module.exports = {
  addPizza,
  getPizzas
}