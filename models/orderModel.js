// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pizzaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza', required: true },
    size: { type: String, required: true }, // User chooses pizza size
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
});

module.exports = mongoose.model('Order', OrderSchema);
