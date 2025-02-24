const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name should be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/.+@.+\..+/, 'Invalid email format']
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        unique: true,
        match: [/^\d{10}$/, 'Phone number should be 10 digits long']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password should be at least 8 characters long']
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: ['admin', 'user']
    },
    licenseNumber: {
        type: String,
        required: [true, 'License number is required'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
