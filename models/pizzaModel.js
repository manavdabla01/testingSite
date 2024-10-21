const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    toppings: { type: [String], required: true },
    sizes: [{
        size: { type: String, required: true },  // Example: small, medium, large
        price: { type: Number, required: true }  // Price based on size
    }]
});

module.exports = mongoose.model('Pizza', PizzaSchema);
