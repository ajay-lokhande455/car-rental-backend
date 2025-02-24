const User = require('../models/userModel');

const getAllUsers = async(req, res) => {
        try {
            const users = await User.find().select('-password');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err.message });
        }
    };

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving user', error: err.message });
    }
};

module.exports = {
    getAllUsers,
    getUser,
}