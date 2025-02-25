const express = require('express');
const router = express.Router();
const {createPayment, getAllPayments, getPaymentById, updatePayment, deletePayment, getPaymentByUserId} = require('../controller/paymentController');
const {verifyToken, isAdmin, isUser} = require('../middleware/authmiddleware')

router.post('/',verifyToken, createPayment);
router.get('/',verifyToken, isAdmin, getAllPayments);
router.get('/:id',verifyToken, getPaymentById);
router.put('/:id',verifyToken, updatePayment);
router.delete('/:id',verifyToken, deletePayment);
router.get('/user/:id',verifyToken, getPaymentByUserId);


module.exports = router;
