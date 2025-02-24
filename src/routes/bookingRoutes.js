const express = require('express');
const { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBooking } = require('../controller/bookingController');
const {verifyToken, isAdmin,} = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/book-car', verifyToken,  createBooking);
router.get('/:id', verifyToken, getBookingById);
router.get('/', verifyToken,isAdmin, getAllBookings);
router.put('/:id', verifyToken, isAdmin, updateBookingStatus);
router.delete('/:id', verifyToken, deleteBooking);

module.exports = router;
