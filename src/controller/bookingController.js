const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');

const createBooking = async (req, res) => {
    try {
        const { car, startDate, endDate, totalPrice, discount } = req.body;

        const existingCar = await Car.findById(car);
        if (!existingCar) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const booking = new Booking({
            user: req.user.id,
            car,
            startDate,
            endDate,
            totalPrice,
            discount
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (err) {
        res.status(500).json({ message: 'Error creating booking', error: err.message });
    }
};

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user car');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user car');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching booking', error: err.message });
    }
};

const updateBookingStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.status = status;
        await booking.save();
        res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (err) {
        res.status(500).json({ message: 'Error updating booking status', error: err.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting booking', error: err.message });
    }
};

const getAllBookingByUserId = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user.id }).populate('car');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching bookings', error: err.message });
    }
};

module.exports = { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBooking, getAllBookingByUserId };
