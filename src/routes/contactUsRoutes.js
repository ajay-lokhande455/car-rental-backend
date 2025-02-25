const express = require('express');
const router = express.Router();
const {createContactUs, getAllContactUs, getContactUsById, deleteContactUs, } = require('../controller/contactUsController');
const { verifyToken, isUser, isAdmin } = require('../middleware/authmiddleware');

router.post('/', verifyToken, isUser, createContactUs);
router.get('/', verifyToken, isAdmin, getAllContactUs);
router.get('/:id', verifyToken, isAdmin, getContactUsById);
router.delete('/:id', verifyToken, isAdmin, deleteContactUs);

module.exports = router;