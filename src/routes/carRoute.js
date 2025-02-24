const express = require('express');
const { createCar, getAllCars, getCarById, updateCar, deleteCar } = require('../controller/carController');
const { isAdmin, verifyToken, isUser } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/add-car', verifyToken, isAdmin, createCar);
router.get('/', verifyToken, getAllCars);
router.get('/:id', verifyToken, getCarById);
router.put('/:id', verifyToken, isAdmin, updateCar);
router.delete('/:id', verifyToken, isAdmin, deleteCar);

module.exports = router;
