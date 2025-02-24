const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: 'Start date must be in the future'
        }
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return this.startDate < value;
            },
            message: 'End date must be after start date'
        }
    },
    discount: {
        type: Number,
        min: 0,
        max: 100
    },
    
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
