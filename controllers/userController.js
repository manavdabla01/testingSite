// controllers/userController.js
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/tokenUtils');

// Signup (Admin or Customer)
const signup = async (req, res) => {
    const { username, email, password, role } = req.body; // Email added to signup
    try {
        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ Message: 'Username or Email already exists' });
        }

        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ Message: `${role} account created successfully` });
    } catch (error) {
        res.status(500).json({ Error: 'Error creating account' });
        console.log(error.message)
    }
};

// Login
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ Error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ Error: 'Invalid credentials' });
        }

        const payload = {
            _id: user._id,
            password: user.password
        }
        const token = generateToken(payload, process.env.JWT_SECRET);

        res.json({ token, role: user.role });
    } catch (error) {
        res.status(500).json({ Error: 'Error logging in' });
        console.log(error.message)
    }
};

module.exports = {
  signup,
  login
}