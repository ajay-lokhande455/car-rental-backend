const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, phone, username, password, role, address, licenseNumber } = req.body;

        const existingUser = await User.findOne({
            $or: [{ email }, { phone }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User with given details already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            username,
            password: hashedPassword,
            role,
            address,
            licenseNumber
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', newUser });

    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};


const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ 
            $or: [{ email }, { username }] 
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user});

    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


module.exports = {
    register,
    loginUser,
 };
