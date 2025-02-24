const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Car name is required'],
        unique: true
    },
    model: {
        type: String,
        required: [true, 'Car model is required']
    },
    carNumber : {
        type: String,
        required: [true, 'Car number is required'],
        unique: true,
        match: /^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/i,
        message: 'Car number must follow the format "AB-123-CD"'
    },

    year: {
        type: Number,
        required: [true, 'Car year is required'],
        min: [1900, 'Car year must be after 1900'],
        max: [new Date().getFullYear(), 'Car year must be in the current year']
    },
    color: {
        type: String,
        required: [true, 'Car color is required']
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Car price is required'],
        min: [0, 'Car price must be a positive number']
    },
    images : {
        type: [String],
        required: [false, 'Car images are required']
    },

    availability: {
        type: Boolean,
        default: true
    },

    fuelType :{
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'],
        required: [true, 'Car fuel type is required']
    },
    Seats : {
        type: Number,
        required: [true, 'Car seats are required'],
        min: [1, 'Car must have at least 1 seat'],
        max: [5, 'Car must have at most 5 seats']
    },

    topSpeed : {
        type: Number,
        required: [true, 'Car top speed is required'],
        min: [0, 'Car top speed must be a positive number']
    },
    securityDeposite : {
        type: Number,
        required: [true, 'Car security deposit is required'],
        min: [0, 'Car security deposit must be a positive number']
    },
    fuel :{
        type: String,
        enum: ['Not Include', 'Included']
    },
    fuelCapacity :{
        type: Number,
        required: [true, 'Car fuel capacity is required'],
        min: [0, 'Car fuel capacity must be a positive number']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Car', carSchema);
