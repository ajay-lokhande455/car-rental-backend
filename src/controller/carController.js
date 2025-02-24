const Car = require('../models/carModel');

const createCar = async (req, res) => {
    try {
        const { name, model, year, carNumber, color, pricePerDay, images, availability, fuelType, Seats, topSpeed, securityDeposite, fuel, fuelCapacity  } = req.body;

        const existingCar = await Car.findOne({ carNumber });
        if (existingCar) return res.status(400).json({ message: 'Car with this number already exists' });

        const newCar = new Car({ name, model, year, color, carNumber, images, pricePerDay, availability, fuelType, Seats, topSpeed, securityDeposite, fuel, fuelCapacity });
        await newCar.save();
        res.status(201).json({ message: 'Car created successfully', car: newCar });

    } catch (err) {
        res.status(500).json({ message: 'Error creating car', error: err.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const cars = await Car.find().limit(limit * 1).skip((page - 1) * limit);
        res.status(200).json({ total: cars.length, cars });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cars', error: err.message });
    }
};

const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching car', error: err.message });
    }
};

const updateCar = async (req, res) => {
    try {
        const { name, model, year, color, images, carNumber, pricePerDay, availability, fuelType, Seats, topSpeed, securityDeposite, fuel, fuelCapacity  } = req.body;

        const updatedCar = await Car.findByIdAndUpdate(
            req.params.id,
            { name, model, year, images, carNumber, color, pricePerDay, availability, fuelType, Seats, topSpeed, securityDeposite, fuel, fuelCapacity  },
            { new: true, runValidators: true }
        );

        if (!updatedCar) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });

    } catch (err) {
        res.status(500).json({ message: 'Error updating car', error: err.message });
    }
};

const deleteCar = async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        if (!deletedCar) return res.status(404).json({ message: 'Car not found' });

        res.status(200).json({ message: 'Car deleted successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Error deleting car', error: err.message });
    }
};

module.exports = { createCar, getAllCars, getCarById, updateCar, deleteCar };
