const express = require('express');
const { createBooking, getAllBookings, getBookingById, updateBookingStatus, deleteBooking, getAllBookingByUserId } = require('../controller/bookingController');
const {verifyToken, isAdmin,} = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', verifyToken,  createBooking);
router.get('/:id', verifyToken, getBookingById);
router.get('/', verifyToken,isAdmin, getAllBookings);
router.put('/:id', verifyToken, isAdmin, updateBookingStatus);
router.delete('/:id', verifyToken, deleteBooking);
router.get('/user/:id', verifyToken, getAllBookingByUserId);


module.exports = router;
